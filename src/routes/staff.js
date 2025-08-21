import express from "express";
import Staff from "../models/Staff.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    console.log("Fetching staff");
    const staff = await Staff.find();
    if (!staff || staff.length === 0) {
      return res.status(404).json({ message: "No staff found" });
    }
    res.json(staff);
  } catch (err) {
    console.error("Error fetching staff:", err.message);
    next(err);
  }
});

export default router;