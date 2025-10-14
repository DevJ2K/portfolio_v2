import { Chat } from "@/types/Chat";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const API_KEY = process.env.API_KEY;
    const API_BASE_URL = process.env.API_BASE_URL;

    if (!API_BASE_URL) {
      console.error("API base URL is not configured.");
      return NextResponse.json(
        { error: "API base URL is not configured." },
        { status: 500 }
      );
    }

    if (!API_KEY) {
      console.error("API key is not configured.");
      return NextResponse.json(
        { error: "API key is not configured." },
        { status: 500 }
      );
    }

    const {
      email,
      title,
      message,
    }: { email: string; title: string; message: string } = await req.json();

    return await fetch(`${API_BASE_URL}/contact/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        email: email,
        title: title,
        message: message,
      }),
    });
  } catch (error: Error | unknown) {
    console.error("Error in /api/contact/send:", error);
    return NextResponse.json(
      {
        error: `Internal Server Error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}
