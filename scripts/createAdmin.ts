import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

/**
 * Admin User Creation Script
 * Run this script to manually create admin users
 * 
 * Usage in terminal:
 * npx ts-node scripts/createAdmin.ts
 */

async function createAdminUser() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error("❌ MONGODB_URI not set in .env.local");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("test");

    // Admin details - CHANGE THESE VALUES
    const adminData = {
      name: "Admin User",
      email: "admin@codevira.com",
      password: "securePassword123", // Change this!
      role: "admin",
      createdAt: new Date(),
    };

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({
      email: adminData.email,
    });

    if (existingUser) {
      console.log(`❌ User with email ${adminData.email} already exists`);
      process.exit(1);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Create user
    const result = await db.collection("users").insertOne({
      ...adminData,
      password: hashedPassword,
    });

    console.log("✅ Admin user created successfully!");
    console.log(`📧 Email: ${adminData.email}`);
    console.log(`🔐 Password: ${adminData.password}`);
    console.log(`🆔 User ID: ${result.insertedId}`);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

createAdminUser();
