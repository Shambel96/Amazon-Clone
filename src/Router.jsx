import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Payment from "./Pages/Payment/Payment";
import Auth from "./Pages/Auth/Auth";
import Cart from "./Pages/Cart/Cart";
import Orders from "./Pages/Orders/Orders";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Results from "./Pages/Results/Results";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51TYt1yQYBOTXGGH2Gx7odlpSSXzbiFuxjRGPqmvFjzTMxF2GfKLHMddmDBOO6wbYqj1sMJfKQb2DzdETVx2AnaSh00Z3T7uoG9",
);

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/categories/:CategoryName" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
