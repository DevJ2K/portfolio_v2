import type { Chat } from "~/types/Chat";

export const useApi = () => {

  const fetchAiResponse = async (
    body: { conversation: Array<Chat> },
    onMessage: (_: string) => void
  ) => {

    const controller = new AbortController();
    const signal = controller.signal;

    const response = await fetch('/api/chat/ask', {
      method: 'POST',
      body: JSON.stringify(body),
      signal,
    });

    if (!response.ok) {
      console.error("Error response:", await response.json().catch(() => ({})));
      throw new Error("An error occurred while streaming the response.");
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (!reader) {
      throw new Error("Unable to read streaming response.");
    }

    let finished = false;

    let resolveDone: () => void;
    let rejectDone: (error: Error | unknown) => void;

    const done = new Promise<void>((resolve, reject) => {
      resolveDone = resolve;
      rejectDone = reject;
    });

    const readStream = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            finished = true;
            resolveDone();
            break;
          }
          const chunk = decoder.decode(value, { stream: true });
          onMessage(chunk);
        }
      } catch (error: Error | unknown) {
        if (signal.aborted) {
          resolveDone();
        } else {
          rejectDone(error);
        }
      } finally {
        reader.releaseLock();
      }
    };

    readStream();

    return {
      abort: () => {
        if (!finished) {
          controller.abort();
        }
      },
      done,
    };
  };

  return {
    fetchAiResponse,
  };
};
