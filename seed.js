// server/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./src/models/Project.js";
import Post from "./src/models/Post.js";
import Leadership from "./src/models/Leadership.js";
import Staff from "./src/models/Staff.js";
import Job from "./src/models/Job.js";
import Contact from "./src/models/Contact.js";

// Configure dotenv
dotenv.config();

// Verify MONGO_URI
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
    await mongoose.connect(process.env.MONGO_URI);
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
      `${ASSET_BASE_URL}/assets/proj17.jpg`, // Video for Community Clean Energy
      `${ASSET_BASE_URL}/assets/proj9.jpg`,
      `${ASSET_BASE_URL}/assets/proj10.jpg`,
      `${ASSET_BASE_URL}/assets/proj20.jpg`,
      `${ASSET_BASE_URL}/assets/proj12.jpg`,
      `${ASSET_BASE_URL}/assets/proj13.jpg`,
      `${ASSET_BASE_URL}/assets/proj14.jpg`,
      
    ];
    const postImages = [
      `${ASSET_BASE_URL}/assets/proj3.jpg`,
      `${ASSET_BASE_URL}/assets/proj4.jpg`,
    ];
    const leadershipImages = [
      `${ASSET_BASE_URL}/assets/mojeed.jpg`,
      `${ASSET_BASE_URL}/assets/yemisi.jpg`,
      `${ASSET_BASE_URL}/assets/Abimbola.jpg`,
      `${ASSET_BASE_URL}/assets/harley.png`,
      `${ASSET_BASE_URL}/assets/aliu.png`,
    ];
    const staffImages = [
      `${ASSET_BASE_URL}/assets/ibrhim.png`,
      `${ASSET_BASE_URL}/assets/aliu.png`,
     
    ];

    // Seed Projects
    const projects = [
      {
        title: "Taking care vulnarable",
        description: "Providing support, protection, and compassion to those who are at risk or unable to care for themselves..",
        image: projectImages[0], // proj1.jpg
        link: "https://mulikat-atoke-abati-f.onrender.com/",
        isVideo: false,
      },
      {
        title: "Education for All",
        description: "Providing scholarships and resources to rural schools.",
        image: projectImages[1], // proj2.jpg
        link: "https://mulikat-atoke-abati-f.onrender.com/",
        isVideo: false,
      },
      {
        title: "Community Clean Energy",
        description: "Implementing solar energy solutions in rural areas.",
        image: projectImages[2], // proj8.mp4
        link: "https://mulikat-atoke-abati-f.onrender.com/",
        isVideo: true,
      },
      {
        title: "Community Clean Energy",
        description: "Implementing solar energy solutions in rural areas.",
        image: projectImages[3], // proj8.mp4
        link: "https://mulikat-atoke-abati-f.onrender.com/",
        isVideo: true,
      },
      {
        title: "Community Clean Energy",
        description: "Implementing solar energy solutions in rural areas.",
        image: projectImages[4], // proj8.mp4
        link: "https://mulikat-atoke-abati-f.onrender.com/",
        isVideo: true,
      },
      {
        title: "Community Clean Energy",
        description: "Implementing solar energy solutions in rural areas.",
        image: projectImages[5], // proj8.mp4
        link: "https://mulikat-atoke-abati-f.onrender.com/",
        isVideo: true,
      },
      {
        title: "Community Clean Energy",
        description: "Implementing solar energy solutions in rural areas.",
        image: projectImages[6], // proj8.mp4
        link: "https://mulikat-atoke-abati-f.onrender.com/",
        isVideo: true,
      },
      {
        title: "Community Clean Energy",
        description: "Implementing solar energy solutions in rural areas.",
        image: projectImages[7], // proj8.mp4
        link: "https://mulikat-atoke-abati-f.onrender.com/",
        isVideo: true,
      },
      {
        title: "Community Clean Energy",
        description: "Implementing solar energy solutions in rural areas.",
        image: projectImages[8], // proj8.mp4
        link: "https://mulikat-atoke-abati-f.onrender.com/",
        isVideo: true,
      },
      {
        title: "Community Clean Energy",
        description: "Implementing solar energy solutions in rural areas.",
        image: projectImages[9], // proj8.mp4
        link: "https://mulikat-atoke-abati-f.onrender.com/",
        isVideo: true,
      },
      {
        title: "Community Clean Energy",
        description: "Implementing solar energy solutions in rural areas.",
        image: projectImages[10], // proj8.mp4
        link: "https://mulikat-atoke-abati-f.onrender.com/",
        isVideo: true,
      },
      {
        title: "Community Clean Energy",
        description: "Implementing solar energy solutions in rural areas.",
        image: projectImages[11], // proj8.mp4
        link: "https://mulikat-atoke-abati-f.onrender.com/",
        isVideo: true,
      },
      {
        title: "Community Clean Energy",
        description: "Implementing solar energy solutions in rural areas.",
        image: projectImages[12], // proj8.mp4
        link: "https://mulikat-atoke-abati-f.onrender.com/",
        isVideo: true,
      }
      
      
    ];
    await Project.insertMany(projects);
    console.log("Seeded Projects");

    // Seed Posts
    const posts = [
      {
        title: "Impact of Our 2024 Projects",
        content: "Learn how our healthcare and education initiatives made a difference this year.",
        image: postImages[0], // proj3.jpg
      },
      {
        title: "Community Stories: Ajoke's Journey",
        content: "Ajoke, a scholarship recipient, shares her story of pursuing education in rural Nigeria.",
        image: postImages[1], // proj4.jpg
      },
    ];
    await Post.insertMany(posts);
    console.log("Seeded Posts");

    // Seed Leadership
    const leadership = [
      {
        name: "Lukman .m.o Abati",
        position: "Founder",
        bio: "Lukman .m.o Abati has led Muikat Atoke Abati Foundation since the beginning, driving initiatives in education and conservation.",
        image: leadershipImages[0], // lider1.png
      },
      {
        name: "Oluwayemisi o Abat",
        position: "Co Founder",
        bio: "Oluwayemisi  oversees project implementation, since the beginning of Muikat Atoke Abati Foundation.",
        image: leadershipImages[1], // lider2.jpg
      },
      {
        name: "Abimbola Abati",
        position: "Co Founder",
        bio: "Abimbola Abati is one of the founder, since the beginning of Muikat Atoke Abati Foundation.",
        image: leadershipImages[2], // lider2.jpg
      },
      {
        name: "Harley Clair",
        position: "Co Founder",
        bio: "Harley Clair is one of the founder, since the beginning of Muikat Atoke Abati Foundation.",
        image: leadershipImages[3], // lider2.jpg
      },
      {
        name: "Aliu Abati",
        position: "Co Founder",
        bio: "Aliu Abati is one of the founder, since the beginning of Muikat Atoke Abati Foundation.",
        image: leadershipImages[4], // lider2.jpg
      },
    ];
    await Leadership.insertMany(leadership);
    console.log("Seeded Leadership");

    // Seed Staff
    const staff = [
      {
        name: "Aliu Abati",
        role: "Community Outreach Coordinator",
        bio: "Aliu engages with local communities to identify needs and coordinate projects.",
        image: staffImages[0], // staf5.jpg
        isVideo: false,
      },
      {
        name: "Ibrahim",
        role: "Conservation Specialist",
        bio: "Ibrahim works on environmental projects, specializing in reforestation and wildlife protection.",
        image: staffImages[1], // staf6.jpg
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