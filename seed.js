// server/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";
import Project from "./src/models/Project.js";
import Post from "./src/models/Post.js";
import Leadership from "./src/models/Leadership.js";
import Staff from "./src/models/Staff.js";
import Job from "./src/models/Job.js";

// Configure dotenv
dotenv.config();

// Initialize Unsplash API
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch,
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

// Fetch Unsplash image URL by query
const fetchImage = async (query) => {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      perPage: 1,
      orientation: "landscape",
    });
    if (result.response && result.response.results.length > 0) {
      return result.response.results[0].urls.regular;
    }
    return "https://via.placeholder.com/300"; // Fallback image
  } catch (err) {
    console.error(`Error fetching image for query "${query}":`, err.message);
    return "https://via.placeholder.com/300";
  }
};

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Promise.all([
      Project.deleteMany({}),
      Post.deleteMany({}),
      Leadership.deleteMany({}),
      Staff.deleteMany({}),
      Job.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    // Fetch images
    const projectImages = await Promise.all([
      fetchImage("rainforest"),
      fetchImage("education"),
    ]);
    const postImages = await Promise.all([
      fetchImage("community"),
      fetchImage("nature"),
    ]);
    const leadershipImages = await Promise.all([
      fetchImage("professional portrait"),
      fetchImage("business person"),
    ]);
    const staffImages = await Promise.all([
      fetchImage("team member"),
      fetchImage("worker"),
    ]);

    // Seed Projects
    const projects = [
      {
        title: "Reforestation Initiative",
        description: "Planting 10,000 trees to restore Costa Rica’s rainforests.",
        image: projectImages[0],
      },
      {
        title: "Education for All",
        description: "Providing scholarships and resources to rural schools.",
        image: projectImages[1],
      },
    ];
    await Project.insertMany(projects);
    console.log("Seeded Projects");

    // Seed Posts
    const posts = [
      {
        title: "Impact of Our 2024 Projects",
        content: "Learn how our reforestation and education initiatives made a difference this year.",
        image: postImages[0],
      },
      {
        title: "Community Stories: Maria’s Journey",
        content: "Maria, a scholarship recipient, shares her story of pursuing education in rural Costa Rica.",
        image: postImages[1],
      },
    ];
    await Post.insertMany(posts);
    console.log("Seeded Posts");

    // Seed Leadership
    const leadership = [
      {
        name: "Ana Morales",
        title: "Executive Director",
        bio: "Ana has led Amigos of Costa Rica for over a decade, driving initiatives in education and conservation. She holds a PhD in Environmental Science.",
        image: leadershipImages[0],
      },
      {
        name: "Carlos Rivera",
        title: "Program Director",
        bio: "Carlos oversees project implementation, with 15 years of experience in nonprofit management.",
        image: leadershipImages[1],
      },
    ];
    await Leadership.insertMany(leadership);
    console.log("Seeded Leadership");

    // Seed Staff
    const staff = [
      {
        name: "Sofia Hernandez",
        role: "Community Outreach Coordinator",
        bio: "Sofia engages with local communities to identify needs and coordinate projects.",
        image: staffImages[0],
      },
      {
        name: "Luis Vargas",
        role: "Conservation Specialist",
        bio: "Luis works on environmental projects, specializing in reforestation and wildlife protection.",
        image: staffImages[1],
      },
    ];
    await Staff.insertMany(staff);
    console.log("Seeded Staff");

    // Seed Jobs
    const jobs = [
      {
        title: "Project Manager",
        description: "Lead community development projects in Costa Rica. Requires 5+ years of experience.",
        location: "San José, Costa Rica",
      },
      {
        title: "Fundraising Coordinator",
        description: "Develop and execute fundraising strategies to support our mission.",
        location: "Remote",
      },
    ];
    await Job.insertMany(jobs);
    console.log("Seeded Jobs");

    console.log("Seeding completed successfully!");
  } catch (err) {
    console.error("Seeding error:", err.message);
  } finally {
    mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

// Run the seeder
const runSeeder = async () => {
  await connectDB();
  await seedData();
};

runSeeder();