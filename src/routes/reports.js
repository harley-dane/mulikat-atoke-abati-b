import express from "express";
import Report from "../models/Report.js";

const router = express.Router();

// Get all reports
router.get("/", async (req, res, next) => {
  try {
    console.log("Fetching reports");
    const reports = await Report.find().sort({ year: -1 }); // Sort by year descending
    if (!reports || reports.length === 0) {
      return res.status(404).json({ message: "No reports found" });
    }
    res.json(reports);
  } catch (err) {
    console.error("Error fetching reports:", err.message);
    next(err);
  }
});

// Create a new report (for admin use)
router.post("/", async (req, res, next) => {
  try {
    console.log("Creating report:", req.body);
    const report = new Report({
      title: req.body.title,
      description: req.body.description,
      pdfLink: req.body.pdfLink,
      year: req.body.year,
      spendingDetails: req.body.spendingDetails,
    });
    const newReport = await report.save();
    res.status(201).json(newReport);
  } catch (err) {
    console.error("Error creating report:", err.message);
    res.status(400).json({ message: err.message });
  }
});

export default router;