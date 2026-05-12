import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const certificateId = searchParams.get("id");

    if (!certificateId) {
      return NextResponse.json(
        { message: "Certificate ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("test");

    // Try to find by certificate number or ID
    const certificate = await db.collection("certificates").findOne({ certificateNo: certificateId });

    if (!certificate) {
      return NextResponse.json(
        { message: "Certificate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        studentName: certificate.studentName || "N/A",
        domain: certificate.domain || "N/A",
        duration: certificate.duration || "N/A",
        certificateNo: certificate.certificateNo || "N/A",
        startingDate: certificate.startingDate || "N/A",
        awardDate: certificate.awardDate || "N/A",
        status: certificate.status || "verified",
      },
    });
  } catch (err) {
    console.error("Certificate verification error:", err);
    return NextResponse.json(
      { message: "Failed to verify certificate" },
      { status: 500 }
    );
  }
}
