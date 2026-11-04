/**
 * Smart link resolution: re-implementation of the taap.it behaviour observed
 * on https://taap.it/ccK6SI1 (Nov. 2026).
 *
 * For each visitor, decides from the User-Agent whether to show the
 * "open in your browser" gateway (TikTok) or which URLs the redirect page
 * must open, and when.
 */

export type Platform = "ios" | "android" | "desktop" | "other";

export type SmartLink = {
  /** Canonical path on this site, e.g. "/ACT". */
  path: string;
  /**
   * Destination opened immediately, per platform.
   * `null` = no immediate redirect: the visitor only gets `fallback`, 1s later.
   */
  targets: Record<Platform, string | null>;
  /** Opened 1s after the page loads, if the visitor is still on it. */
  fallback: string | null;
  /** Link preview (Open Graph / Twitter card) and document language. */
  meta: {
    lang: string;
    title: string;
    description: string;
    /** Image path relative to the site root. */
    image: string;
  };
};

export type Resolution =
  | { kind: "gateway" }
  | {
      kind: "redirect";
      /** Opened right away ("" = nothing). */
      finalLink: string;
      /** Opened after 1s ("" = nothing). */
      fallbackUrl: string;
      /** Opened after 2s ("" = nothing). */
      fallbackUrl2: string;
    };

// Matching is case-sensitive, like taap.it.

/**
 * TikTok in-app browser. taap.it matches `TikTok`, `musical_ly` and
 * `BytedanceWebview`; the other tokens also catch older Android TikTok
 * builds, which only send `trill_<version>`.
 */
const TIKTOK = /TikTok|musical_ly|musically_go|BytedanceWebview|trill_\d|AppName\/trill/;
const INSTAGRAM = /Instagram/;
const FACEBOOK = /FBAN|FBAV|FB_IAB/;
/** iOS in-app browsers that taap.it escapes with the `x-safari-` scheme (iOS 17+). */
const SAFARI_ESCAPE = /Snapchat|Twitter|LinkedInApp|Pinterest|Telegram|WhatsApp|Discord/;
/** Android in-app browsers that taap.it escapes with an `intent:` URL. */
const ANDROID_IN_APP = /Instagram|FBAN|FBAV|FB_IAB|Snapchat|Twitter|LinkedInApp|Pinterest|Telegram|WhatsApp|Discord/;

export function detectPlatform(userAgent: string): Platform {
  if (/iPhone|iPad|iPod/.test(userAgent)) return "ios";
  if (/Android/.test(userAgent)) return "android";
  if (/Windows|Macintosh/.test(userAgent)) return "desktop";
  return "other";
}

/** Appends the visitor's query string (utm_*, ct, ...) to a destination. */
function withQuery(url: string | null, query: URLSearchParams): string {
  if (!url) return "";
  if (query.toString() === "") return url;
  const destination = new URL(url);
  query.forEach((value, key) => destination.searchParams.append(key, value));
  return destination.toString();
}

/** Opens an http(s) URL outside an Android in-app browser. */
function toAndroidIntent(url: string): string {
  const { protocol } = new URL(url);
  const scheme = protocol.slice(0, -1);
  return `intent://${url.slice(protocol.length + 2)}#Intent;scheme=${scheme};end;`;
}

export function resolveSmartLink(
  link: SmartLink,
  userAgent: string,
  query: URLSearchParams
): Resolution {
  // TikTok's in-app browser blocks the App Store: ask the visitor to switch
  // to their real browser, where this same URL will redirect normally.
  if (TIKTOK.test(userAgent)) return { kind: "gateway" };

  const platform = detectPlatform(userAgent);
  const target = withQuery(link.targets[platform], query);
  let finalLink = target;
  let fallbackUrl = withQuery(link.fallback, query);

  if (platform === "ios" && target) {
    if (INSTAGRAM.test(userAgent)) {
      finalLink = `instagram://extbrowser/?url=${encodeURIComponent(target)}`;
    } else if (FACEBOOK.test(userAgent)) {
      // Facebook / Messenger open App Store links natively: no second attempt.
      fallbackUrl = "";
    } else if (SAFARI_ESCAPE.test(userAgent)) {
      finalLink = `x-safari-${target}`;
    }
  }

  if (platform === "android" && target && ANDROID_IN_APP.test(userAgent)) {
    finalLink = toAndroidIntent(target);
  }

  return { kind: "redirect", finalLink, fallbackUrl, fallbackUrl2: "" };
}
