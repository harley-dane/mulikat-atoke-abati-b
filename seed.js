import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import Project from "./src/models/Project.js";
import Post from "./src/models/Post.js";
import Leadership from "./src/models/Leadership.js";
import Staff from "./src/models/Staff.js";
import Job from "./src/models/Job.js";
import Contact from "./src/models/contact.js";
import Report from "./src/models/Report.js";
import generateReportPDF from "./src/utils/generateReportPDF.js";

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
      Report.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    // Define asset paths
    const projectImages = [
      `${ASSET_BASE_URL}/assets/proj1.jpg`,
      `${ASSET_BASE_URL}/assets/proj2.jpg`,
      `${ASSET_BASE_URL}/assets/proj8.mp4`,
      `${ASSET_BASE_URL}/assets/staf1.mp4`,
      `${ASSET_BASE_URL}/assets/staf2.mp4`,
      `${ASSET_BASE_URL}/assets/proj6.jpg`,
      `${ASSET_BASE_URL}/assets/proj7.jpg`,
      `${ASSET_BASE_URL}/assets/proj17.jpg`,
      `${ASSET_BASE_URL}/assets/proj9.jpg`,
      `${ASSET_BASE_URL}/assets/proj10.jpg`,
      `${ASSET_BASE_URL}/assets/proj20.jpg`,
      `${ASSET_BASE_URL}/assets/proj12.jpg`,
      `${ASSET_BASE_URL}/assets/proj13.jpg`,
      `${ASSET_BASE_URL}/assets/proj23.jpg`,
      `${ASSET_BASE_URL}/assets/proj21.jpg`,
      `${ASSET_BASE_URL}/assets/proj25.jpg`,
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
      `${ASSET_BASE_URL}/assets/rodiat.jpg`,
      `${ASSET_BASE_URL}/assets/aliu.png`,
    ];

    // Seed Projects
    const projects = [
      {
        title: "Support for Vulnerable Communities",
        description: "Providing support, protection, and compassion to those at risk or unable to care for themselves.",
        image: projectImages[0],
        link: "https://mulikat-atoke-abati-b.onrender.com/",
        isVideo: false,
      },
      {
        title: "Education for All",
        description: "Providing scholarships and resources to rural schools.",
        image: projectImages[1],
        link: "https://mulikat-atoke-abati-b.onrender.com/",
        isVideo: false,
      },
      {
        title: "Free Medical Checkups (Lagos)",
        description: "Bringing essential healthcare services to underserved communities in Lagos.",
        image: projectImages[2],
        link: "https://mulikat-atoke-abati-b.onrender.com/",
        isVideo: true,
      },
      {
        title: "Free Medical Checkups (Abuja)",
        description: "Delivering free medical services to underserved communities in Abuja.",
        image: projectImages[3],
        link: "https://mulikat-atoke-abati-b.onrender.com/",
        isVideo: true,
      },
      {
        title: "Community Health Outreach",
        description: "Providing healthcare services directly to underserved communities.",
        image: projectImages[4],
        link: "https://mulikat-atoke-abati-b.onrender.com/",
        isVideo: true,
      },
      {
        title: "Healthcare Access Program",
        description: "Improving access to healthcare in rural areas.",
        image: projectImages[5],
        link: "https://mulikat-atoke-abati-b.onrender.com/",
        isVideo: false,
      },
      {
        title: "Medical Support Initiative",
        description: "Supporting medical needs in underserved regions.",
        image: projectImages[6],
        link: "https://mulikat-atoke-abati-b.onrender.com/",
        isVideo: false,
      },
      {
        title: "Community Clean Energy",
        description: "Promoting sustainable energy solutions in rural communities.",
        image: projectImages[7],
        link: "https://mulikat-atoke-abati-b.onrender.com/",
        isVideo: false,
      },
      {
        title: "Youth Empowerment Program",
        description: "Empowering youth through skills training and education.",
        image: projectImages[8],
        link: "https://mulikat-atoke-abati-b.onrender.com/",
        isVideo: false,
      },
      {
        title: "Women’s Health Initiative",
        description: "Providing healthcare services focused on women’s needs.",
        image: projectImages[9],
        link: "https://mulikat-atoke-abati-b.onrender.com/",
        isVideo: false,
      },
      {
        title: "Rural Development Project",
        description: "Supporting infrastructure development in rural areas.",
        image: projectImages[10],
        link: "https://mulikat-atoke-abati-b.onrender.com/",
        isVideo: false,
      },
      {
        title: "Child Education Support",
        description: "Providing educational resources for children in need.",
        image: projectImages[11],
        link: "https://mulikat-atoke-abati-b.onrender.com/",
        isVideo: false,
      },
      {
        title: "Community Wellness Program",
        description: "Promoting overall community health and wellness.",
        image: projectImages[12],
        link: "https://mulikat-atoke-abati-b.onrender.com/",
        isVideo: false,
      },
      {
        title: "Healthcare Training",
        description: "Training healthcare workers in rural communities.",
        image: projectImages[13],
        link: "https://mulikat-atoke-abati-b.onrender.com/",
        isVideo: false,
      },
      {
        title: "Mobile Clinic Initiative",
        description: "Deploying mobile clinics to remote areas.",
        image: projectImages[14],
        link: "https://mulikat-atoke-abati-b.onrender.com/",
        isVideo: false,
      },
      {
        title: "Nutrition Support Program",
        description: "Providing nutritional support to vulnerable populations.",
        image: projectImages[15],
        link: "https://mulikat-atoke-abati-b.onrender.com/",
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
        bio: "Lukman M.O. Abati has led Muikat Atoke Abati Foundation since its inception, driving initiatives in education and conservation.",
        image: leadershipImages[0],
      },
      {
        name: "Oluwayemisi O. Abati",
        position: "Co-Founder",
        bio: "Oluwayemisi oversees project implementation for the Muikat Atoke Abati Foundation.",
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
        bio: "Aliu Abati drives conservation and community development programs.",
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

    // Seed Reports
    const reports = [
      {
        title: "2024 Annual Report",
        description: "A comprehensive overview of our projects, impact, and financials for 2024.",
        pdfLink: `${ASSET_BASE_URL}/assets/2024-annual-report.pdf`,
        year: 2024,
        spendingDetails: [
          {
            category: "Staff Salaries",
            amount: 18000000,
            description: "Salaries for 20 full-time staff members supporting community outreach and project management.",
          },
          {
            category: "Medical Supplies",
            amount: 12000000,
            description: "Procurement of medicines and medical equipment for free community health checkups.",
          },
          {
            category: "Wheelchairs for the Disabled",
            amount: 8000000,
            description: "Purchase and distribution of 100 wheelchairs to support mobility for disabled individuals.",
          },
          {
            category: "Education Scholarships",
            amount: 7000000,
            description: "Scholarships for 50 students in rural schools to cover tuition and supplies.",
          },
          {
            category: "Administrative Costs",
            amount: 3000000,
            description: "Office expenses, utilities, and operational costs for the foundation.",
          },
        ],
      },
    ];

    // Generate PDFs for each report
    for (const report of reports) {
      const pdfPath = path.join(process.cwd(), "assets", `${report.year}-annual-report.pdf`);
      console.log(`Generating PDF for ${report.year} at: ${pdfPath}`);
      await generateReportPDF(report, pdfPath);
      if (fs.existsSync(pdfPath)) {
        console.log(`Verified PDF exists at: ${pdfPath}`);
      } else {
        console.error(`PDF not found at: ${pdfPath}`);
      }
    }

    await Report.deleteMany({});
    await Report.insertMany(reports);
    console.log("Seeded Reports");

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