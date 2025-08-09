// server/src/models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: { type: String, required: true },
});

export default mongoose.model("Post", postSchema);