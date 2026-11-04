import type { NextRequest } from "next/server";
import { pickGatewayLocale, renderGatewayPage, renderRedirectPage } from "./pages";
import { resolveSmartLink, type SmartLink } from "./resolve";

/** Public origin of the site, used for absolute Open Graph URLs. */
function siteOrigin(request: NextRequest): string {
  const host = (request.headers.get("x-forwarded-host") ?? request.headers.get("host"))
    ?.split(",")[0]
    .trim();
  if (!host) return request.nextUrl.origin;
  const proto =
    request.headers.get("x-forwarded-proto")?.split(",")[0].trim() ||
    request.nextUrl.protocol.replace(":", "");
  return `${proto}://${host}`;
}

/**
 * Dev only (`next dev`): `?preview=tiktok` shows the TikTok gateway in any
 * browser, `&lang=fr|en|es|de` forces its language. Ignored in production.
 */
function gatewayPreview(request: NextRequest): { lang: string | null } | null {
  if (process.env.NODE_ENV !== "development") return null;
  const params = request.nextUrl.searchParams;
  return params.get("preview") === "tiktok" ? { lang: params.get("lang") } : null;
}

/** Answers a smart link request with the redirect page or the TikTok gateway. */
export function smartLinkResponse(request: NextRequest, link: SmartLink): Response {
  const userAgent = request.headers.get("user-agent") ?? "";
  const origin = siteOrigin(request);
  const preview = gatewayPreview(request);
  const resolution = preview
    ? ({ kind: "gateway" } as const)
    : resolveSmartLink(link, userAgent, request.nextUrl.searchParams);

  const html =
    resolution.kind === "gateway"
      ? renderGatewayPage(
          link,
          origin,
          pickGatewayLocale(preview?.lang || request.headers.get("accept-language"))
        )
      : renderRedirectPage(link, origin, resolution);

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // The page depends on the visitor's device and language: never cache it.
      "Cache-Control": "private, no-store, max-age=0",
      Vary: "User-Agent, Accept-Language",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
