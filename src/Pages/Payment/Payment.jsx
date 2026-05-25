import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LayOut from "../../Layout/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../Api/axios";
import { db } from "../../Utility/firebase";
import { doc, setDoc } from "firebase/firestore";

function Payment() {
  const { state } = useContext(DataContext);
  const { basket, user } = state;
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  const totalItems = basket.reduce(
    (count, item) => count + (item.quantity || 1),
    0,
  );
  const totalAmount = basket.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0,
  );

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!basket.length) {
        setClientSecret("");
        return;
      }

      const stripeBaseUrl =
        import.meta.env.VITE_FIREBASE_FUNCTIONS_URL ||
        "http://localhost:5001/clone-6cb97/us-central1/api";
      const totalInCents = Math.round(totalAmount * 100);

      try {
        const response = await axios.post(
          `${stripeBaseUrl}/payment/create`,
          {},
          { params: { total: totalInCents } },
        );

        setClientSecret(response.data.clientSecret);
        setStatusMessage(
          "Payment intent ready. Enter card details to complete checkout.",
        );
        setError("");
      } catch (err) {
        setError(
          err.response?.data?.error ||
            err.message ||
            "Unable to initialize payment.",
        );
      }
    };

    createPaymentIntent();
  }, [basket, totalAmount]);

  const handleCardChange = (event) => {
    setDisabled(!event.complete);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    if (!stripe || !elements) {
      setError("Stripe is still loading. Please wait a moment and try again.");
      return;
    }

    if (!clientSecret) {
      setError("Unable to process payment. Please refresh the page.");
      return;
    }

    setProcessing(true);
    setError("");
    setStatusMessage("Processing payment...");

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not found.");
      setProcessing(false);
      return;
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          email: user?.email || "guest@example.com",
        },
      },
    });
    if (payload.error) {
      setError(payload.error.message || "Payment failed.");
      setProcessing(false);
      setStatusMessage("");
      return;
    }

    const paymentIntent = payload.paymentIntent;
    console.log("Payment payload:", payload);
    console.log("User uid:", user?.uid, "PaymentIntent id:", paymentIntent?.id);
    if (paymentIntent?.id) {
      try {
        if (user?.uid) {
          await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
            basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
          console.log("Order saved to Firestore: users/" + user.uid + "/orders/" + paymentIntent.id);
        } else {
          console.warn("No user logged in — skipping Firestore write for orders.");
        }
      } catch (writeErr) {
        console.error("Failed to write order to Firestore:", writeErr);
        setError("Payment succeeded but saving order failed: " + writeErr.message);
      }
    } else {
      console.warn("No paymentIntent id found — cannot save order to Firestore.");
    }
    setError("");
    setProcessing(false);
    setSucceeded(true);
    setStatusMessage("Payment successful! Thank you for your order.");
    navigate("/orders");
  };


  return (
    <LayOut>
      <div className={classes.payment_header}>
        Checkout ({totalItems}) items!
      </div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email || "Loading..."}</div>
            <div>123 React lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review Items and Delivery</h3>
          <div className={classes.review_items_container}>
            {basket?.map((item) => (
              <ProductCard
                product={item}
                key={item.id}
                hideAddButton={true}
                horizontal={true}
              />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_form_section}>
            <p className={classes.payment_description}>
              Enter full Stripe card details to complete checkout. Use{" "}
              <strong>4242 4242 4242 4242</strong> with any future expiry date
              and any CVC.
            </p>

            <form onSubmit={handleSubmit} className={classes.payment_form}>
              <div className={classes.card_input_container}>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        letterSpacing: "0.025em",
                        fontFamily: "Arial, sans-serif",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                  onChange={handleCardChange}
                />
              </div>

              <button
                className={classes.pay_button}
                disabled={
                  processing ||
                  disabled ||
                  succeeded ||
                  !clientSecret ||
                  !stripe ||
                  !elements
                }
                
              >
                {processing
                  ? "Processing..."
                  : succeeded
                    ? "Payment complete"
                    : `Pay now ${new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(totalAmount)}`}
              </button>

              {error && <div className={classes.error_message}>{error}</div>}
              {statusMessage && (
                <div
                  className={
                    succeeded ? classes.success_message : classes.status_message
                  }
                >
                  {statusMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
