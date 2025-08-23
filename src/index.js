import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import mime from "mime-types";
import projectRoutes from "./routes/projects.js";
import donationRoutes from "./routes/donations.js";
import contactRoutes from "./routes/contact.js";
import postRoutes from "./routes/posts.js";
import newsletterRoutes from "./routes/newsletter.js";
import cryptoRoutes from "./routes/crypto.js";
import leadershipRoutes from "./routes/leadership.js";
import staffRoutes from "./routes/staff.js";
import jobRoutes from "./routes/jobs.js";
import reportRoutes from "./routes/reports.js";

// Initialize dotenv
const dotenvResult = dotenv.config({ path: path.resolve(process.cwd(), ".env") });
if (dotenvResult.error && process.env.NODE_ENV !== "production") {
  console.error("Error loading .env file:", dotenvResult.error.message);
  process.exit(1);
}

// Debug environment variables
if (process.env.NODE_ENV !== "production") {
  console.log("Environment variables loaded:");
  console.log("PORT:", process.env.PORT || "Not set");
  console.log("MONGO_URI:", process.env.MONGO_URI ? "Set" : "Not set");
}

const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:3000",
  "https://mulikat-atoke-abati-b.onrender.com",
  "https://mulikat-atoke-abati-f.onrender.com",
  "https://mulikatatokeabatifoundation.org",
  "https://api.mulikatatokeabatifoundation.org",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Ensure assets directory exists
const assetsDir = path.join(process.cwd(), "assets");
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
  console.log(`Created assets directory: ${assetsDir}`);
}

// Serve static assets with detailed logging
app.use(
  "/assets",
  (req, res, next) => {
    console.log(`Attempting to serve: ${req.url}`);
    next();
  },
  express.static(assetsDir, {
    setHeaders: (res, filePath) => {
      console.log(`Serving static file: ${filePath}`);
      const contentType = mime.lookup(filePath) || "application/octet-stream";
      res.setHeader("Content-Type", contentType);
      if (filePath.endsWith(".pdf")) {
        res.setHeader("Content-Disposition", "attachment; filename=" + path.basename(filePath));
      }
    },
  })
);

// Debug endpoint to list files in assets directory
app.get("/debug/assets", (req, res) => {
  const assetsDir = path.join(process.cwd(), "assets");
  console.log(`Checking assets directory: ${assetsDir}`);
  fs.readdir(assetsDir, (err, files) => {
    if (err) {
      console.error(`Error reading assets directory: ${err.message}`);
      return res.status(500).json({ message: "Error reading assets directory", error: err.message });
    }
    console.log(`Files in assets directory: ${files}`);
    res.json({ files });
  });
});

app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Route handlers
app.use("/api/projects", projectRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/crypto", cryptoRoutes);
app.use("/api/leadership", leadershipRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/reports", reportRoutes);

// Health check endpoint
app.use("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}\nStack: ${err.stack}`);
  res.status(err.status || 500).json({
    message: "Internal Server Error",
    error: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
});

// Catch-all route
app.use((req, res) => {
  console.log(`404: ${req.method} ${req.url}`);
  res.status(404).json({ message: "Endpoint not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));