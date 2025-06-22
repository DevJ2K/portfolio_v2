export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  if (!config.apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "API key is not configured.",
    });
  }
  const controller = new AbortController();

  event.node.req.on("close", () => {
    controller.abort();
  });

  try {
    const response = await fetch(`${config.apiBaseUrl}/chat/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        "x-api-key": config.apiKey,
      },
      body,
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error("Error response:", await response.json().catch(() => ({})));
      console.error("Response status:", response.status, response.statusText);
      throw new Error("An error occurred while streaming the response.");
    }

    setHeader(event, "Content-Type", "text/event-stream");
    setHeader(event, "Cache-Control", "no-cache");
    setHeader(event, "Connection", "keep-alive");

    return response;
  } catch (error) {
    if (controller.signal.aborted) {
      return;
    }

    console.error("Streaming error:", error);
    throw new Error("Internal server error during streaming.");
  }
});
