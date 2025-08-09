// server/src/routes/donations.js
import dotenv from "dotenv";
dotenv.config(); // Temporary for debugging
import express from "express";
import Stripe from "stripe";

const router = express.Router();

console.log("donations.js - STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY ? "Set" : "Not set");

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("Error: STRIPE_SECRET_KEY is not set in environment variables");
  throw new Error("STRIPE_SECRET_KEY is not set");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

router.post("/create-checkout-session", async (req, res) => {
  console.log("Request body:", req.body);
  const { amount, projectId } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Amount must be greater than 0" });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: projectId ? `Donation for Project ${projectId}` : "General Donation" },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/donate/success",
      cancel_url: "http://localhost:5173/donate/cancel",
      metadata: { projectId: projectId || "general" },
    });
    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

export default router;