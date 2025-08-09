// server/src/routes/posts.js
import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;