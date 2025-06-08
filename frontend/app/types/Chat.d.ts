export interface Chat {
  content: string;
  role: "user" | "assistant";
  context: Array<string> | null;
}
