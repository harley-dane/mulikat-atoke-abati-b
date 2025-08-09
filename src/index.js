// server/src/index.js
import dotenv from "dotenv";
dotenv.config();
console.log("Environment variables loaded:");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY ? "Set" : "Not set");

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import projectRoutes from "./routes/projects.js";
import donationRoutes from "./routes/donations.js";
import contactRoutes from "./routes/contact.js";
import postRoutes from "./routes/posts.js";
import newsletterRoutes from "./routes/newsletter.js";
import cryptoRoutes from "./routes/crypto.js";
import leadershipRoutes from "./routes/leadership.js";
import staffRoutes from "./routes/staff.js";
import jobRoutes from "./routes/jobs.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api/projects", projectRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/crypto", cryptoRoutes);
app.use("/api/leadership", leadershipRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));