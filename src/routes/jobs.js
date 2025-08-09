// server/src/routes/jobs.js
import express from "express";
import Job from "../models/Job.js";

const router = express.Router();

// Get all job listings
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;