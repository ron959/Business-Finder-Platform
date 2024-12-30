import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { connectDB } from "./src/config/db";
import { User } from "./src/models/User";
import { Business } from "./src/models/Business";
import dotenv from "dotenv";


dotenv.config();

const seedDatabase = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await connectDB();

    console.log("Seeding database...");

    // Clear existing data
    await User.deleteMany({});
    await Business.deleteMany({});
    console.log("Existing data cleared.");

    // Common password for all users (hashed)
    const password = await bcrypt.hash("123456", 10);

    // Predefined Users
    const users = await User.insertMany([
      {
        name: "Test User 1",
        email: "user1@example.com",
        password, // hashed password
        plan: "Standard",
        savedBusinesses: [],
      },
      {
        name: "Test User 2",
        email: "user2@example.com",
        password, // hashed password
        plan: "Gold",
        savedBusinesses: [],
      },
      {
        name: "Business Owner",
        email: "owner@example.com",
        password, // hashed password
        plan: "Platinum",
        savedBusinesses: [],
      },
    ]);
    console.log("Users created:", users.length);

    // Predefined Businesses
    const businesses = await Business.insertMany([
      {
        name: "Tech Haven",
        description: "The best store for all your tech needs.",
        category: "Electronics",
        owner: users[2]._id, // Business Owner
        subscribers: [users[0]._id], // Test User 1
        reviews: [
          {
            userId: users[1]._id, // Test User 2
            comment: "Great customer service!",
            createdAt: new Date("2024-12-01T10:00:00Z"),
          },
        ],
        createdAt: new Date("2024-11-30T08:00:00Z"),
        updatedAt: new Date("2024-12-01T10:00:00Z"),
      },
      {
        name: "Bistro Bliss",
        description: "Cozy café with delightful desserts.",
        category: "Food & Beverage",
        owner: users[2]._id, // Business Owner
        subscribers: [],
        reviews: [],
        createdAt: new Date("2024-12-10T09:00:00Z"),
        updatedAt: new Date("2024-12-10T09:00:00Z"),
      },
    ]);
    console.log("Businesses created:", businesses.length);

    // Close the database connection
    await mongoose.disconnect();
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1);
  }
};

seedDatabase();