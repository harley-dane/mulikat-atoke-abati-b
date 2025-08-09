// server/src/models/Staff.js
import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model("Staff", staffSchema);