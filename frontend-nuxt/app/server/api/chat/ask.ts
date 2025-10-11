export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  if (!config.apiKey) {
    console.error("API key is not configured.");
    throw new Error("API key is not configured.");
  }

  setHeader(event, "Content-Type", "text/event-stream");
  setHeader(event, "Cache-Control", "no-cache");
  setHeader(event, "Connection", "keep-alive");
  setHeader(event, "X-Accel-Buffering", "no");
  setHeader(event, "Access-Control-Allow-Origin", "*");

  const controller = new AbortController();
  let timeoutId: NodeJS.Timeout | undefined = undefined;

  const cleanup = () => {
    controller.abort();
    if (timeoutId) clearTimeout(timeoutId);
  };

  event.node.req.on("close", cleanup);
  event.node.req.on("error", cleanup);

  timeoutId = setTimeout(() => {
    console.log("Request timeout");
    cleanup();
  }, 4 * 60000);

  try {
    const response = await fetch(`${config.apiBaseUrl}/chat/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
        "x-api-key": config.apiKey,
      },
      body,
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error("Error response:", response.status, response.statusText);
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error("No response body received");
    }

    const reader = response.body.getReader();

    return new ReadableStream({
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
      }
    });

  } catch (error) {
    cleanup();

    if (controller.signal.aborted) {
      console.log("Request aborted");
      return new Response("", { status: 499 });
    }

    console.error("Streaming error:", error);

    return new ReadableStream({
      start(controller) {
        const errorMessage = "Une erreur est survenue lors du streaming.";
        controller.enqueue(new TextEncoder().encode(errorMessage));
        controller.close();
      }
    });
  }
});
