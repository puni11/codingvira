import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const client = await clientPromise;

    const blog = await client
      .db()
      .collection("blogs")
      .findOne({ slug });

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching blog" },
      { status: 500 }
    );
  }
}