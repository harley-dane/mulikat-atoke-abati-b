// server/src/models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  isVideo: { type: Boolean, default: false }, // Add isVideo field
});

export default mongoose.model("Project", projectSchema);