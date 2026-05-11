import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Registration is disabled - only admin can create accounts
    return NextResponse.json(
      { message: "Registration is disabled. Please contact admin for access." },
      { status: 403 }
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
