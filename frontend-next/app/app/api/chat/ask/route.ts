// app/api/chat/route.ts
import { NextRequest } from "next/server";

// export const runtime = "edge"; // ou 'nodejs'

export async function POST(req: NextRequest) {
  try {

    const apiKey = process.env.API_KEY;
    const apiBaseUrl = process.env.API_BASE_URL;

    if (!apiKey) {
      console.error("API key is not configured.");
      return new Response(
        JSON.stringify({ error: "API key is not configured." }),
        { status: 500 }
      );
    }

    if (!apiBaseUrl) {
      console.error("API base URL is not configured.");
      return new Response(
        JSON.stringify({ error: "API base URL is not configured." }),
        { status: 500 }
      );
    }

    const { conversation } = await req.json();

    const controller = new AbortController();
    let timeoutId: NodeJS.Timeout | undefined = undefined;

    const cleanup = () => {
      controller.abort();
      if (timeoutId) clearTimeout(timeoutId);
    };

    // Gestion du timeout
    timeoutId = setTimeout(() => {
      console.log("Request timeout");
      cleanup();
    }, 4 * 60000);

    // Gestion de l'annulation côté client
    req.signal.addEventListener("abort", cleanup);

    try {
      const response = await fetch(`${apiBaseUrl}/chat/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ conversation }),
        signal: controller.signal,
      });

      if (!response.ok) {
        console.error("Error response:", response.status, response.statusText);
        throw new Error(
          `API returned ${response.status}: ${response.statusText}`
        );
      }

      if (!response.body) {
        throw new Error("No response body received");
      }

      const reader = response.body.getReader();

      const stream = new ReadableStream({
        async start(controller) {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                controller.close();
                break;
              }
              controller.enqueue(value);
            }
          } catch (error) {
            console.error("Stream reading error:", error);
            controller.error(error);
          } finally {
            cleanup();
          }
        },
        cancel(reason) {
          console.log("Stream cancelled:", reason);
          reader.cancel();
          cleanup();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          "X-Accel-Buffering": "no",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      cleanup();

      if (controller.signal.aborted) {
        console.log("Request aborted");
        return new Response("", { status: 499 });
      }

      console.error("Streaming error:", error);

      const errorStream = new ReadableStream({
        start(controller) {
          const errorMessage = "Une erreur est survenue lors du streaming.";
          controller.enqueue(new TextEncoder().encode(errorMessage));
          controller.close();
        },
      });

      return new Response(errorStream, {
        headers: {
          "Content-Type": "text/event-stream",
        },
      });
    }
  } catch (error) {
    console.error("Request processing error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500 }
    );
  }
}
