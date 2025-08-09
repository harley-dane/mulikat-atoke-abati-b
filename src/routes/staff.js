// server/src/routes/staff.js
import express from "express";
import Staff from "../models/Staff.js";

const router = express.Router();

// Get all staff members
router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;