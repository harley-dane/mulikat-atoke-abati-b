import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    console.log("Fetching projects");
    const projects = await Project.find();
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err.message);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log("Creating project:", req.body);
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      link: req.body.link,
    });
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error("Error creating project:", err.message);
    res.status(400).json({ message: err.message });
  }
});

export default router;