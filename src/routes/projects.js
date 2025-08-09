// server/src/routes/projects.js
import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a project
router.post("/", async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    link: req.body.link,
  });
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;