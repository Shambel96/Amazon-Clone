const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Wel Come!",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total, 10);

  if (Number.isNaN(total) || total <= 0) {
    return res.status(400).json({
      error: "Total must be a valid number greater than 0.",
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    logger.info("Created Stripe PaymentIntent", paymentIntent.id);

    return res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    logger.error("Stripe payment error", error);
    return res.status(500).json({
      error: error.message,
    });
  }
});

exports.api = onRequest(app);