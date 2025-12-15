import { config } from "dotenv";
import bcrypt from "bcryptjs";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const DEFAULT_PASSWORD = process.env.SEED_USER_PASSWORD || "ChangeMe123!";

// Pre-hash the password for all users
const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);

const seedUsers = [
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: hashedPassword,
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    password: hashedPassword,
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  // ... repeat for all users
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully with hashed passwords");
  } catch (error) {
    console.error(" Error seeding database:", error);
  }
};

seedDatabase();
