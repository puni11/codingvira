import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const MAX_REQUESTS = 5; // 5 per minute

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, subject, message } = body;

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    const userAgent = req.headers.get("user-agent") || "unknown";
    const country = req.headers.get("x-vercel-ip-country") || "unknown";

    const client = await clientPromise;
    const db = client.db();

    const contacts = db.collection("contacts");
    const rateLimits = db.collection("rateLimits");

    // ✅ MongoDB Rate Limiting
    const requestCount = await rateLimits.countDocuments({ ip });

    if (requestCount >= MAX_REQUESTS) {
      return NextResponse.json(
        { error: "Too many requests. Try again in 1 minute." },
        { status: 429 }
      );
    }

    // Insert rate record (auto expires in 60s)
    await rateLimits.insertOne({
      ip,
      createdAt: new Date(),
    });

    // 🔥 BACKEND VALIDATION
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    if (!phone || phone.trim().length < 7) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json({ error: "Message too short" }, { status: 400 });
    }

    // 🔎 Duplicate Email Check
    const existing = await contacts.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existing) {
      return NextResponse.json(
        { error: "This email already submitted." },
        { status: 400 }
      );
    }

    // 💾 Save Contact
    await contacts.insertOne({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || "",
      message: message.trim(),
      ipAddress: ip,
      userAgent,
      country,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db();
    const contacts = db.collection("contacts");

    let query: any = {};

    // 🔍 Search Filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    // 📅 Date Filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    const total = await contacts.countDocuments(query);

    const data = await contacts
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}