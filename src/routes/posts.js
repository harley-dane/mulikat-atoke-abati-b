import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    console.log("Fetching posts");
    const posts = await Post.find();
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log("Creating post:", req.body);
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
    });
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error creating post:", err.message);
    res.status(400).json({ message: err.message });
  }
});

export default router;