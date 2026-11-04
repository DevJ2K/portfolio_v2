import type { NextRequest } from "next/server";
import { smartLinkResponse } from "@/utils/smartLink";
import { ACT_LINK } from "@/utils/smartLink/links";

// The answer depends on the visitor's User-Agent: never prerender it.
export const dynamic = "force-dynamic";

/** devj2k.com/ACT (and /ACT., rewritten in next.config.ts) → ACT. on the App Store. */
export function GET(request: NextRequest) {
  return smartLinkResponse(request, ACT_LINK);
}
