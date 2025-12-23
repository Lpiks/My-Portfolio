const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Project = require('./models/Project');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // 1. Clear existing data
        await Admin.deleteMany();
        await Project.deleteMany();

        // 2. Prepare Admin from .env
        const adminUser = {
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD
        };

        // Safety check for .env variables
        if (!adminUser.username || !adminUser.password) {
            throw new Error("Missing ADMIN_USERNAME or ADMIN_PASSWORD in .env file");
        }

        // 3. Create Admin
        await Admin.create(adminUser);

        // 4. Define Projects
        const projects = [
            {
                title: "Nebula Finance Dashboard",
                description: "A high-performance fintech analytics platform featuring real-time data visualization, dark mode-first design, and secure authentication.",
                techStack: ["React", "TypeScript", "Node.js", "Recharts", "Tailwind CSS"],
                images: [{ url: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=2574&auto=format&fit=crop" }],
                liveLink: "https://example.com/nebula",
                repoLink: "https://github.com/example/nebula",
                features: ["Real-time Crypto Price WebSocket", "Interactive Candlestick Charts", "User Portfolio Analytics", "Secure JWT Authentication"],
                featured: true,
                featuredOnHome: true,
                displayOrder: 1
            },
            {
                title: "Zenith E-Commerce",
                description: "Next-generation shopping experience with AI-powered recommendations, 3D product previews, and a seamless checkout flow.",
                techStack: ["Next.js", "Three.js", "Stripe", "MongoDB", "Framer Motion"],
                images: [{ url: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2670&auto=format&fit=crop" }],
                liveLink: "https://example.com/zenith",
                repoLink: "https://github.com/example/zenith",
                features: ["AI Product Recommendations", "3D Model Viewer (Three.js)", "Stripe Payment Intent Integration", "Admin Inventory Dashboard"],
                featured: true,
                featuredOnHome: false,
                displayOrder: 2
            }
        ];

        // 5. Insert Projects
        await Project.insertMany(projects);

        console.log(`✅ Data Imported successfully! Admin: ${adminUser.username}`);
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Admin.deleteMany();
        await Project.deleteMany();
        console.log('🗑️ Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}