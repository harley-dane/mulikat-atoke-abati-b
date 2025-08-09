// server/src/routes/leadership.js
import express from "express";
import Leadership from "../models/Leadership.js";

const router = express.Router();

// Get all leadership members
router.get("/", async (req, res) => {
  try {
    const leaders = await Leadership.find();
    res.json(leaders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;