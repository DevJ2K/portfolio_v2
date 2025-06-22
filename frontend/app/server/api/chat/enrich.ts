export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  if (!config.apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "API key is not configured.",
    });
  }

  return await $fetch(`${config.apiBaseUrl}/chat/enrich`, {
    method: event.method,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.apiKey,
    },
    body: JSON.stringify({
      conversation: body.conversation,
      prompt: body.prompt,
    }),
  });
});
