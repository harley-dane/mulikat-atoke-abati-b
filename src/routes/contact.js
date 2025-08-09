// server/src/routes/contact.js
import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;