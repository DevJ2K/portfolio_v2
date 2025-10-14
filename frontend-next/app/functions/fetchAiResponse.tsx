import { Chat } from "@/types/Chat";

const fetchAiResponse = async (
    body: { conversation: Array<Chat> },
    onMessage: (token: string) => void
  ) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await fetch('/api/chat/ask', {
        method: 'POST',
        body: JSON.stringify(body),
        signal,
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        console.error("Error response:", response.status, errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Unable to read streaming response.");
      }

      const decoder = new TextDecoder("utf-8");
      let finished = false;

      const processStream = async () => {
        try {
          while (!finished && !signal.aborted) {
            const { done, value } = await reader.read();

            if (done) {
              finished = true;
              break;
            }

            const chunk = decoder.decode(value, { stream: true });
            onMessage(chunk);
          }
        } catch (error) {
          if (!signal.aborted) {
            console.error("Stream processing error:", error);
            throw error;
          }
        } finally {
          try {
            reader.releaseLock();
          } catch {
            //
          }
        }
      };

      const streamPromise = processStream();

      return {
        abort: () => {
          if (!finished) {
            finished = true;
            controller.abort();
          }
        },
        done: streamPromise,
      };

    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

export default fetchAiResponse;
