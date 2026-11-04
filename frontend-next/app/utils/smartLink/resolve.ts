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
  /**
   * App name shown in bold on the TikTok gateway ("Pour télécharger ACT.,").
   * Without it, the gateway says "Pour accéder au lien,".
   */
  appName?: string;
  /**
   * App Store Connect campaign (`ct`) per in-app browser, used when the URL
   * has no `ct`. `{ tiktok: "Bio Tiktok" }` = visitors coming from TikTok
   * count for the "Bio Tiktok" campaign.
   */
  campaigns?: Partial<Record<InAppBrowser, string>>;
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
  /** Reload this smart link with its campaign in the URL (relative Location). */
  | { kind: "addCampaign"; location: string }
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

export type InAppBrowser =
  | "tiktok"
  | "instagram"
  | "facebook"
  | "snapchat"
  | "twitter"
  | "linkedin"
  | "pinterest"
  | "telegram"
  | "whatsapp"
  | "discord";

const IN_APP_BROWSERS: [InAppBrowser, RegExp][] = [
  ["tiktok", TIKTOK],
  ["instagram", INSTAGRAM],
  ["facebook", FACEBOOK],
  ["snapchat", /Snapchat/],
  ["twitter", /Twitter/],
  ["linkedin", /LinkedInApp/],
  ["pinterest", /Pinterest/],
  ["telegram", /Telegram/],
  ["whatsapp", /WhatsApp/],
  ["discord", /Discord/],
];

export function detectInAppBrowser(userAgent: string): InAppBrowser | null {
  return IN_APP_BROWSERS.find(([, pattern]) => pattern.test(userAgent))?.[0] ?? null;
}

/**
 * Query string with spaces as %20: the App Store reads `+` literally, so
 * `ct=Bio+Tiktok` would be another campaign than "Bio Tiktok". (A literal
 * `+` is already serialized as %2B, so every `+` here is a space.)
 */
export function toQueryString(params: URLSearchParams): string {
  return params.toString().replace(/\+/g, "%20");
}

export function detectPlatform(userAgent: string): Platform {
  if (/iPhone|iPad|iPod/.test(userAgent)) return "ios";
  if (/Android/.test(userAgent)) return "android";
  if (/Windows|Macintosh/.test(userAgent)) return "desktop";
  return "other";
}

/** Adds the visitor's query string (utm_*, ct, ...) to a destination. */
function withQuery(url: string | null, query: URLSearchParams): string {
  if (!url) return "";
  if (query.toString() === "") return url;
  const destination = new URL(url);
  query.forEach((value, key) => destination.searchParams.set(key, value));
  destination.search = toQueryString(destination.searchParams);
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
  visitorQuery: URLSearchParams
): Resolution {
  const query = new URLSearchParams(visitorQuery);
  const inApp = detectInAppBrowser(userAgent);
  const campaign = inApp && link.campaigns?.[inApp];
  if (campaign && !query.has("ct")) query.set("ct", campaign);

  // TikTok's in-app browser blocks the App Store: ask the visitor to switch
  // to their real browser, where this same URL will redirect normally.
  if (inApp === "tiktok") {
    // "Open in browser" reopens the current URL: put the campaign in it
    // first, otherwise the browser visit can't be attributed to TikTok.
    if (!visitorQuery.has("ct") && query.has("ct")) {
      return { kind: "addCampaign", location: `?${toQueryString(query)}` };
    }
    return { kind: "gateway" };
  }

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
