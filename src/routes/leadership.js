import express from "express";
import Leadership from "../models/Leadership.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    console.log("Fetching leadership data");
    const leaders = await Leadership.find();
    if (!leaders || leaders.length === 0) {
      return res.status(404).json({ message: "No leadership data found" });
    }
    res.json(leaders);
  } catch (err) {
    console.error("Error fetching leadership:", err.message);
    next(err);
  }
});

export default router;