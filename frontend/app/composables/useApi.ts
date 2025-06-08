export const useApi = () => {

  const fetchAiResponse = async (
    endpoint: string,
    options: RequestInit = {},
    onMessage: (data: string) => void
  ) => {

    const headers = new Headers(options.headers || {});
    headers.set("Accept", "text/event-stream");

    const controller = new AbortController();
    const signal = controller.signal;

    const response = await fetch(endpoint, { ...options, headers, signal });

    if (!response.ok) {
      console.error("Error response:", await response.json());
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
          console.log("Streaming aborted by user.");
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
