import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      studentName,
      domain,
      duration,
      certificateNo,
      startingDate,
      awardDate,
      status,
    } = body;

    // Validation
    if (!studentName || !domain || !certificateNo || !startingDate || !awardDate) {
      return NextResponse.json(
        { message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("test");

    // Check if certificate already exists
    const existingCert = await db
      .collection("certificates")
      .findOne({ certificateNo });

    if (existingCert) {
      return NextResponse.json(
        { message: "Certificate with this number already exists" },
        { status: 409 }
      );
    }

    // Create certificate
    const result = await db.collection("certificates").insertOne({
      studentName,
      domain,
      duration: duration || "N/A",
      certificateNo,
      startingDate,
      awardDate,
      status: status || "verified",
      createdAt: new Date(),
      createdBy: session.user?.email,
    });

    return NextResponse.json({
      success: true,
      data: {
        _id: result.insertedId,
        studentName,
        domain,
        duration: duration || "N/A",
        certificateNo,
        startingDate,
        awardDate,
        status: status || "verified",
      },
    });
  } catch (err) {
    console.error("Certificate creation error:", err);
    return NextResponse.json(
      { message: "Failed to create certificate" },
      { status: 500 }
    );
  }
}
