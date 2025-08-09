// server/src/models/Leadership.js
import mongoose from "mongoose";

const leadershipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model("Leadership", leadershipSchema);