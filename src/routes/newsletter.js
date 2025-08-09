// server/src/routes/newsletter.js
import express from "express";
import Newsletter from "../models/newsletter.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;
  try {
    const subscriber = new Newsletter({ email });
    await subscriber.save();
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;