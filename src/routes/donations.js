// server/src/routes/donations.js
import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount, projectId } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: projectId ? `Donation for Project ${projectId}` : "General Donation",
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `https://mulikat-atoke-abati-f.onrender.com/donate?success=true`,
      cancel_url: `https://mulikat-atoke-abati-f.onrender.com/donate?canceled=true`,
    });
    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;