import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./src/models/Project.js";
import Post from "./src/models/Post.js";
import Leadership from "./src/models/Leadership.js";
import Staff from "./src/models/Staff.js";
import Job from "./src/models/Job.js";
import Contact from "./src/models/contact.js"; // Fixed capitalization to match convention

// Configure dotenv
dotenv.config();

// Verify environment variables
if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in .env file");
  process.exit(1);
}

// Base URL for assets
const ASSET_BASE_URL = process.env.NODE_ENV === "production"
  ? "https://mulikat-atoke-abati-b.onrender.com"
  : "http://localhost:5000";

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
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
      Contact.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    // Define asset paths
    const projectImages = [
      `${ASSET_BASE_URL}/assets/proj1.jpg`,
      `${ASSET_BASE_URL}/assets/proj2.jpg`,
      `${ASSET_BASE_URL}/assets/proj3.jpg`,
      `${ASSET_BASE_URL}/assets/proj4.jpg`,
      `${ASSET_BASE_URL}/assets/proj5.jpg`,
      `${ASSET_BASE_URL}/assets/proj6.jpg`,
      `${ASSET_BASE_URL}/assets/proj7.jpg`,
      `${ASSET_BASE_URL}/assets/proj8.mp4`, // Fixed to include video
      `${ASSET_BASE_URL}/assets/proj9.jpg`,
      `${ASSET_BASE_URL}/assets/proj10.jpg`,
      `${ASSET_BASE_URL}/assets/proj11.jpg`,
      `${ASSET_BASE_URL}/assets/proj12.jpg`,
      `${ASSET_BASE_URL}/assets/proj13.jpg`,
      `${ASSET_BASE_URL}/assets/proj14.jpg`,
      `${ASSET_BASE_URL}/assets/proj15.jpg`,
    ];
    const postImages = [
      `${ASSET_BASE_URL}/assets/proj3.jpg`,
      `${ASSET_BASE_URL}/assets/proj4.jpg`,
    ];
    const leadershipImages = [
      `${ASSET_BASE_URL}/assets/mojeed.jpg`,
      `${ASSET_BASE_URL}/assets/yemisi.jpg`,
      `${ASSET_BASE_URL}/assets/abimbola.jpg`, // Lowercase to match convention
      `${ASSET_BASE_URL}/assets/harley.png`,
      `${ASSET_BASE_URL}/assets/aliu.png`,
    ];
    const staffImages = [
      `${ASSET_BASE_URL}/assets/rodiat.jpg`,
      `${ASSET_BASE_URL}/assets/aliu.png`,
    ];

    // Seed Projects (unique titles)
    const projects = [
      {
        title: "Supporting Vulnerable Communities",
        description: "Providing support, protection, and compassion to those at risk or unable to care for themselves.",
        image: projectImages[0],
        link: "https://mulikatatokeabatifoundation.org/",
        isVideo: false,
      },
      {
        title: "Education for All",
        description: "Providing scholarships and resources to rural schools.",
        image: projectImages[1],
        link: "https://mulikatatokeabatifoundation.org/",
        isVideo: false,
      },
      {
        title: "Community Clean Energy - Solar Phase 1",
        description: "Implementing solar energy solutions in rural areas.",
        image: projectImages[7], // proj8.mp4
        link: "https://mulikatatokeabatifoundation.org/",
        isVideo: true,
      },
      {
        title: "Community Clean Energy - Solar Phase 2",
        description: "Expanding solar energy solutions to additional rural communities.",
        image: projectImages[7], // proj8.mp4
        link: "https://mulikatatokeabatifoundation.org/",
        isVideo: true,
      },
      {
        title: "Community Clean Energy - Wind Initiative",
        description: "Introducing wind energy solutions in rural areas.",
        image: projectImages[8],
        link: "https://mulikatatokeabatifoundation.org/",
        isVideo: false,
      },
      {
        title: "Community Clean Energy - Hydro Project",
        description: "Developing small-scale hydroelectric projects for rural communities.",
        image: projectImages[9],
        link: "https://mulikatatokeabatifoundation.org/",
        isVideo: false,
      },
      {
        title: "Clean Water Access",
        description: "Providing clean water solutions through boreholes and purification systems.",
        image: projectImages[10],
        link: "https://mulikatatokeabatifoundation.org/",
        isVideo: false,
      },
      {
        title: "Healthcare Outreach",
        description: "Mobile clinics to provide healthcare to underserved areas.",
        image: projectImages[11],
        link: "https://mulikatatokeabatifoundation.org/",
        isVideo: false,
      },
      {
        title: "Youth Empowerment Program",
        description: "Training and mentoring youth for leadership and entrepreneurship.",
        image: projectImages[12],
        link: "https://mulikatatokeabatifoundation.org/",
        isVideo: false,
      },
      {
        title: "Reforestation Initiative",
        description: "Planting trees to combat deforestation and promote sustainability.",
        image: projectImages[13],
        link: "https://mulikatatokeabatifoundation.org/",
        isVideo: false,
      },
      {
        title: "Women's Cooperative",
        description: "Supporting women with microfinance and skill development.",
        image: projectImages[14],
        link: "https://mulikatatokeabatifoundation.org/",
        isVideo: false,
      },
    ];
    await Project.insertMany(projects);
    console.log("Seeded Projects");

    // Seed Posts
    const posts = [
      {
        title: "Impact of Our 2024 Projects",
        content: "Learn how our healthcare and education initiatives made a difference this year.",
        image: postImages[0],
      },
      {
        title: "Community Stories: Ajoke's Journey",
        content: "Ajoke, a scholarship recipient, shares her story of pursuing education in rural Nigeria.",
        image: postImages[1],
      },
    ];
    await Post.insertMany(posts);
    console.log("Seeded Posts");

    // Seed Leadership
    const leadership = [
      {
        name: "Lukman M.O. Abati",
        position: "Founder",
        bio: "Lukman M.O. Abati has led Mulikat Atoke Abati Foundation since its inception, driving initiatives in education and conservation.",
        image: leadershipImages[0],
      },
      {
        name: "Oluwayemisi O. Abati",
        position: "Co-Founder",
        bio: "Oluwayemisi oversees project implementation for the Mulikat Atoke Abati Foundation.",
        image: leadershipImages[1],
      },
      {
        name: "Abimbola Abati",
        position: "Co-Founder",
        bio: "Abimbola Abati is a founding member, contributing to the foundation’s mission since its start.",
        image: leadershipImages[2],
      },
      {
        name: "Harley Clair",
        position: "Co-Founder",
        bio: "Harley Clair supports the foundation’s strategic initiatives and community outreach.",
        image: leadershipImages[3],
      },
      {
        name: "Aliu Abati",
        position: "Co-Founder",
        bio: "Aliu Abati drives environmental and sustainability projects for the foundation.",
        image: leadershipImages[4],
      },
    ];
    await Leadership.insertMany(leadership);
    console.log("Seeded Leadership");

    // Seed Staff
    const staff = [
      {
        name: "Rodiat Abati",
        role: "Community Outreach Coordinator",
        bio: "Rodiat engages with local communities to identify needs and coordinate projects.",
        image: staffImages[0],
        isVideo: false,
      },
      {
        name: "Aliu Abati",
        role: "Conservation Specialist",
        bio: "Aliu works on environmental projects, specializing in reforestation and wildlife protection.",
        image: staffImages[1],
        isVideo: false,
      },
    ];
    await Staff.insertMany(staff);
    console.log("Seeded Staff");

    // Seed Jobs
    const jobs = [
      {
        title: "Project Manager",
        description: "Lead community development projects in Nigeria. Requires 5+ years of experience.",
        location: "Lagos, Nigeria",
      },
      {
        title: "Fundraising Coordinator",
        description: "Develop and execute fundraising strategies to support our mission.",
        location: "Remote",
      },
    ];
    await Job.insertMany(jobs);
    console.log("Seeded Jobs");

    // Seed Contacts
    await Contact.insertMany([
      { name: "John Doe", email: "john@example.com", message: "Interested in volunteering!" },
      { name: "Jane Smith", email: "jane@example.com", message: "How can I support your projects?" },
    ]);
    console.log("Seeded Contacts");

    console.log("Seeding completed successfully!");
  } catch (err) {
    console.error("Seeding error:", err.message);
    process.exit(1); // Exit on error to ensure consistent state
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

// Run the seeder
const runSeeder = async () => {
  await connectDB();
  await seedData();
};

runSeeder();