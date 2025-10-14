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
      conversation,
      prompt,
    }: { conversation: Array<Chat>; prompt: string } = await req.json();

    return await fetch(`${API_BASE_URL}/chat/enrich`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        conversation: conversation,
        prompt: prompt,
      }),
    });
  } catch (error: Error | unknown) {
    console.error("Error in /api/chat/ask:", error);
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
