import express from "express";
import Stripe from "stripe";

const router = express.Router();

let stripe;
try {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn("Warning: STRIPE_SECRET_KEY is not set. Stripe routes will be disabled.");
  } else {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
} catch (err) {
  console.error("Error initializing Stripe:", err.message);
}

router.post("/create-checkout-session", async (req, res, next) => {
  if (!stripe) {
    return res.status(503).json({ message: "Stripe is not configured. Please contact the administrator." });
  }
  try {
    const { amount, projectId } = req.body;
    console.log("Creating checkout session:", { amount, projectId });
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
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `https://mulikatatokeabatifoundation.org/donate?success=true`,
      cancel_url: `https://mulikatatokeabatifoundation.org/donate?canceled=true`,
    });
    res.json({ id: session.id });
  } catch (err) {
    console.error("Error creating checkout session:", err.message);
    next(err);
  }
});

export default router;