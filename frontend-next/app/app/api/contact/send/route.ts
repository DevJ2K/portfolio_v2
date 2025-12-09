import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

    if (!DISCORD_WEBHOOK_URL) {
      console.error("Discord webhook URL is not configured.");
      return NextResponse.json(
        { error: "Discord webhook URL is not configured." },
        { status: 500 }
      );
    }

    const {
      email,
      title,
      message,
    }: { email: string; title: string; message: string } = await req.json();

    // Validation basique
    if (!email || !title || !message) {
      return NextResponse.json(
        { error: "Missing required fields: email, title, or message" },
        { status: 400 }
      );
    }

    // Construction du payload Discord
    const discordPayload = {
      embeds: [
        {
          title: "📧 Nouveau message de contact",
          color: 0x00ff00,
          fields: [
            { name: "De", value: email, inline: true },
            { name: "Sujet", value: title, inline: true },
            { name: "Message", value: message, inline: false },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
      content: "@everyone Nouveau message reçu !",
      allowed_mentions: { parse: ["everyone"] },
    };

    // Envoi à Discord
    const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordPayload),
    });

    if (!discordResponse.ok) {
      console.error(
        `Discord API error: ${discordResponse.status} ${discordResponse.statusText}`
      );
      return NextResponse.json(
        { error: "Failed to send message to Discord" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
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
