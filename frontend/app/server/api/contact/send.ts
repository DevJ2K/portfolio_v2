export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  if (!config.apiKey) {
    console.error("API key is not configured.");
    throw new Error("API key is not configured.");
  }

  return await fetch(`${config.apiBaseUrl}/contact/send`, {
    method: event.method,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.apiKey,
    },
    body,
  });
});
