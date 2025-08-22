import express from "express";
import Stripe from "stripe";
import axios from "axios";
import crypto from "crypto";

const router = express.Router();

// Stripe Payment Initialization
router.post("/create-checkout-session", async (req, res, next) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn("STRIPE_SECRET_KEY is not set.");
    return res.status(503).json({ message: "Stripe is not configured. Please contact the administrator." });
  }
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { amount, projectId } = req.body;
    console.log("Creating Stripe checkout session:", { amount, projectId });
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
      success_url: `https://mulikatatokeabatifoundation.org/donate?success=true`,
      cancel_url: `https://mulikatatokeabatifoundation.org/donate?canceled=true`,
    });
    res.json({ id: session.id });
  } catch (err) {
    console.error("Error creating Stripe checkout session:", err.message);
    next(err);
  }
});

// Paystack Payment Initialization
router.post("/paystack/initialize", async (req, res, next) => {
  if (!process.env.PAYSTACK_SECRET_KEY) {
    console.warn("PAYSTACK_SECRET_KEY is not set.");
    return res.status(503).json({ message: "Paystack is not configured. Please contact the administrator." });
  }
  try {
    const { amount, projectId, email } = req.body;
    console.log("Initializing Paystack payment:", { amount, projectId, email });
    if (!amount || amount <= 0 || !email) {
      return res.status(400).json({ message: "Invalid amount or email" });
    }
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        amount: amount * 100, // Paystack expects amount in kobo
        email,
        currency: "NGN", // Adjust based on your needs (e.g., USD, GHS)
        metadata: { projectId },
        callback_url: "https://mulikatatokeabatifoundation.org/donate?success=true",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Error initializing Paystack payment:", err.message);
    next(err);
  }
});

// Flutterwave Payment Initialization
router.post("/flutterwave/initialize", async (req, res, next) => {
  if (!process.env.FLUTTERWAVE_SECRET_KEY || process.env.FLUTTERWAVE_SECRET_KEY === "wOVfy1aAkUtv2cnTeklxtfALjfsqKFUl") {
    console.warn("FLUTTERWAVE_SECRET_KEY is invalid or not set.");
    return res.status(503).json({ message: "Flutterwave is not configured. Please contact the administrator." });
  }
  try {
    const { amount, projectId, email, phone_number } = req.body;
    console.log("Initializing Flutterwave payment:", { amount, projectId, email });
    if (!amount || amount <= 0 || !email) {
      return res.status(400).json({ message: "Invalid amount or email" });
    }
    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: `donation-${Date.now()}`,
        amount,
        currency: "NGN", // Adjust as needed
        redirect_url: "https://mulikatatokeabatifoundation.org/donate?success=true",
        customer: {
          email,
          phone_number,
          name: projectId ? `Donation for Project ${projectId}` : "General Donation",
        },
        customizations: {
          title: "Mulikat Atoke Abati Foundation Donation",
          description: projectId ? `Donation for Project ${projectId}` : "General Donation",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Error initializing Flutterwave payment:", err.message);
    next(err);
  }
});

// Coinbase Commerce Charge Creation
router.post("/coinbase/create-charge", async (req, res, next) => {
  if (!process.env.COINBASE_API_KEY || process.env.COINBASE_API_KEY === "your_coinbase_commerce_api_key" || !process.env.COINBASE_WEBHOOK_SECRET || process.env.COINBASE_WEBHOOK_SECRET === "your_coinbase_webhook_secret") {
    console.warn("COINBASE_API_KEY or COINBASE_WEBHOOK_SECRET is invalid or not set.");
    return res.status(503).json({ message: "Coinbase Commerce is not configured. Please contact the administrator." });
  }
  try {
    const { amount, projectId, email } = req.body;
    console.log("Creating Coinbase Commerce charge:", { amount, projectId, email });
    if (!amount || amount <= 0 || !email) {
      return res.status(400).json({ message: "Invalid amount or email" });
    }
    const response = await axios.post(
      "https://api.commerce.coinbase.com/charges",
      {
        name: projectId ? `Donation for Project ${projectId}` : "General Donation",
        description: "Donation to Mulikat Atoke Abati Foundation",
        local_price: {
          amount: amount.toFixed(2), // Amount in USD
          currency: "USD",
        },
        pricing_type: "fixed_price",
        metadata: { projectId, email },
        redirect_url: "https://mulikatatokeabatifoundation.org/donate?success=true",
        cancel_url: "https://mulikatatokeabatifoundation.org/donate?canceled=true",
      },
      {
        headers: {
          "X-CC-Api-Key": process.env.COINBASE_API_KEY,
          "X-CC-Version": "2018-03-22",
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Error creating Coinbase Commerce charge:", err.message);
    next(err);
  }
});

// Coinbase Commerce Webhook
router.post("/coinbase/webhook", express.raw({ type: "application/json" }), (req, res) => {
  if (!process.env.COINBASE_WEBHOOK_SECRET || process.env.COINBASE_WEBHOOK_SECRET === "your_coinbase_webhook_secret") {
    console.warn("COINBASE_WEBHOOK_SECRET is invalid or not set.");
    return res.status(503).json({ message: "Coinbase webhook is not configured." });
  }
  try {
    const signature = req.headers["x-cc-webhook-signature"];
    const webhookSecret = process.env.COINBASE_WEBHOOK_SECRET;
    const computedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.body)
      .digest("hex");
    if (signature !== computedSignature) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }
    const event = JSON.parse(req.body);
    console.log("Coinbase webhook event:", event);
    if (event.event.type === "charge:confirmed") {
      console.log("Coinbase payment confirmed:", event.event.data);
    }
    res.status(200).send("Webhook received");
  } catch (err) {
    console.error("Error processing Coinbase webhook:", err.message);
    res.status(400).send("Webhook error");
  }
});

// Check available payment methods
router.get("/available-methods", (req, res) => {
  res.json({
    stripe: !!process.env.STRIPE_SECRET_KEY,
    paystack: !!process.env.PAYSTACK_SECRET_KEY,
    flutterwave: !!process.env.FLUTTERWAVE_SECRET_KEY && process.env.FLUTTERWAVE_SECRET_KEY !== "wOVfy1aAkUtv2cnTeklxtfALjfsqKFUl",
    coinbase: !!process.env.COINBASE_API_KEY && process.env.COINBASE_API_KEY !== "your_coinbase_commerce_api_key" && !!process.env.COINBASE_WEBHOOK_SECRET && process.env.COINBASE_WEBHOOK_SECRET !== "your_coinbase_webhook_secret",
    paypal: !!process.env.PAYPAL_CLIENT_ID && !!process.env.PAYPAL_CLIENT_SECRET,
  });
});

export default router;