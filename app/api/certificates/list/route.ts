import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db("test");

    const certificates = await db
      .collection("certificates")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: certificates,
    });
  } catch (err) {
    console.error("Certificate list error:", err);
    return NextResponse.json(
      { message: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}
