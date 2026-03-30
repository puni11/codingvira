import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
    
  try {
    const client = await clientPromise;
    const params = await context.params;
    const id =  await params.id;
    const blog = await client
      .db("test")
      .collection("blogs")
      .findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch {
    return NextResponse.json(
      { message: "Error fetching blog" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { _id, ...rest } = body; // 🔥 remove _id

    const client = await clientPromise;

    const result = await client
      .db()
      .collection("blogs")
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...rest,
            updatedAt: new Date(),
          },
        }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No changes detected" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating blog" },
      { status: 500 }
    );
  }
}
