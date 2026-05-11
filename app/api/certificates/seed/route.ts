import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    // Sample certificate data
    const sampleCertificates = [
      {
        studentName: "Tarun Soni",
        domain: "Web Development Internship",
        duration: "4 weeks",
        certificateNo: "20e6fee",
        startingDate: "20/Jan/2025",
        awardDate: "20/Feb/2025",
        status: "verified",
        createdAt: new Date(),
      },
      {
        studentName: "John Doe",
        domain: "Cloud Computing",
        duration: "6 weeks",
        certificateNo: "21a7gff",
        startingDate: "01/Feb/2025",
        awardDate: "15/Mar/2025",
        status: "verified",
        createdAt: new Date(),
      },
      {
        studentName: "Sarah Johnson",
        domain: "Full Stack Development",
        duration: "8 weeks",
        certificateNo: "22b8hgg",
        startingDate: "15/Jan/2025",
        awardDate: "10/Mar/2025",
        status: "verified",
        createdAt: new Date(),
      },
    ];

    // Insert sample data
    const result = await db.collection("certificates").insertMany(sampleCertificates);

    return NextResponse.json({
      success: true,
      message: "Sample certificates created",
      insertedIds: result.insertedIds,
    });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json(
      { message: "Failed to seed certificates" },
      { status: 500 }
    );
  }
}
