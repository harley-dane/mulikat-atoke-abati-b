import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import projectRoutes from "./routes/projects.js";
import donationRoutes from "./routes/donations.js";
import contactRoutes from "./routes/contact.js";
import postRoutes from "./routes/posts.js";
import newsletterRoutes from "./routes/newsletter.js";
import cryptoRoutes from "./routes/crypto.js";
import leadershipRoutes from "./routes/leadership.js";
import staffRoutes from "./routes/staff.js";
import jobRoutes from "./routes/jobs.js";

// Initialize dotenv
const dotenvResult = dotenv.config({ path: path.resolve(process.cwd(), ".env") });
if (dotenvResult.error) {
  console.error("Error loading .env file:", dotenvResult.error.message);
  process.exit(1);
}

// Debug environment variables (development only)
if (process.env.NODE_ENV !== "production") {
  console.log("Environment variables loaded:");
  console.log("PORT:", process.env.PORT || "Not set");
  console.log("MONGO_URI:", process.env.MONGO_URI ? "Set" : "Not set");
  console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY ? `Set (${process.env.STRIPE_SECRET_KEY.slice(0, 8)}...)` : "Not set");
  console.log("PAYPAL_CLIENT_ID:", process.env.PAYPAL_CLIENT_ID ? "Set" : "Not set");
  console.log("PAYPAL_CLIENT_SECRET:", process.env.PAYPAL_CLIENT_SECRET ? "Set" : "Not set");
  console.log("PAYSTACK_SECRET_KEY:", process.env.PAYSTACK_SECRET_KEY ? `Set (${process.env.PAYSTACK_SECRET_KEY.slice(0, 8)}...)` : "Not set");
  console.log("FLUTTERWAVE_SECRET_KEY:", process.env.FLUTTERWAVE_SECRET_KEY ? "Set" : "Not set");
  console.log("COINBASE_API_KEY:", process.env.COINBASE_API_KEY ? "Set" : "Not set");
  console.log("COINBASE_WEBHOOK_SECRET:", process.env.COINBASE_WEBHOOK_SECRET ? "Set" : "Not set");
}

const app = express();

// CORS configuration
const allowedOrigins = [
  "https://mulikat-atoke-abati-b.onrender.com",
  "https://mulikat-atoke-abati-f.onrender.com",
  "https://mulikatatokeabatifoundation.org",
  "https://api.mulikatatokeabatifoundation.org",
  "http://localhost:3000",
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
app.use(express.json());

// Serve static assets
app.use("/assets", express.static(path.join(process.cwd(), "assets")));

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

// Health check endpoint
app.get("/health", (req, res) => {
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
  res.status(404).json({ message: "Endpoint not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));