import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

/**
 * DEVELOPMENT ONLY: Create a test admin user
 * 
 * Usage: POST http://localhost:3000/api/dev/create-test-user
 * 
 * This endpoint should ONLY be used in development
 * Remove it before deploying to production
 */

export async function POST(req: Request) {
  try {
    // Safety check - only allow in development
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { message: "This endpoint is disabled in production" },
        { status: 403 }
      );
    }

    const client = await clientPromise;
    const db = client.db("test");

    // Test user credentials
    const testUser = {
      name: "Test Admin",
      email: "admin@codevira.com",
      password: "password123",
      role: "admin",
      createdAt: new Date(),
    };

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({
      email: testUser.email,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Test user already exists",
          email: testUser.email,
          note: "Use these credentials to login",
        },
        { status: 200 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(testUser.password, 10);

    // Create user
    const result = await db.collection("users").insertOne({
      ...testUser,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "Test user created successfully",
        email: testUser.email,
        password: testUser.password,
        userId: result.insertedId,
        note: "Use these credentials to login at /login",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Test User Error:", error);
    return NextResponse.json(
      { 
        message: "Failed to create test user",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
