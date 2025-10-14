export async function POST(req: any) {
  try {
    const API_KEY = process.env.API_KEY;
    const API_BASE_URL = process.env.API_BASE_URL;

    if (!API_BASE_URL) {
      return new Response("API base URL not configured", { status: 500 });
    }

    if (!API_KEY) {
      return new Response("API key not configured", { status: 500 });
    }


    const { conversation, prompt } = await req.json();

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
  } catch (error) {
    console.error("Error in /api/chat/ask:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
