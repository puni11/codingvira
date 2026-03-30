import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, title, content } = body;

    if (!slug || !title || !content) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("test");

    // 🔍 Check slug inside create
    const slugExists = await db.collection("blogs").findOne({ slug });

    if (slugExists) {
      return NextResponse.json(
        { message: "Slug already exists" },
        { status: 409 }
      );
    }

    await db.collection("blogs").insertOne({
      ...body,
      createdAt: new Date(),
      status: "published",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create blog" },
      { status: 500 }
    );
  }
}
