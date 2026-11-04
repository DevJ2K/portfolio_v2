/**
 * HTML served by smart links. Plain strings rather than React: these pages
 * must stay tiny, skip the portfolio layout and run before any bundle loads.
 */

import type { Resolution, SmartLink } from "./resolve";

type Redirect = Extract<Resolution, { kind: "redirect" }>;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** JS string literal that cannot close the surrounding <script>. */
const jsString = (value: string) => JSON.stringify(value).replace(/</g, "\\u003c");

function metaTags(link: SmartLink, origin: string): string {
  const title = escapeHtml(link.meta.title);
  const description = escapeHtml(link.meta.description);
  const image = escapeHtml(origin + link.meta.image);
  const url = escapeHtml(origin + link.path);
  return `<title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
    <meta name="googlebot" content="noindex, nofollow" />
    <meta name="bingbot" content="noindex, nofollow" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />`;
}

/** Blank page that opens the destination right away, then the fallbacks. */
export function renderRedirectPage(link: SmartLink, origin: string, redirect: Redirect): string {
  const { finalLink, fallbackUrl, fallbackUrl2 } = redirect;
  const noscriptUrl = escapeHtml(finalLink || fallbackUrl);
  return `<!DOCTYPE html>
<html lang="${escapeHtml(link.meta.lang)}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${metaTags(link, origin)}
    <script>
      (function () {
        var finalLink = ${jsString(finalLink)};
        var fallbackUrl = ${jsString(fallbackUrl)};
        var fallbackUrl2 = ${jsString(fallbackUrl2)};

        if (finalLink) {
          window.location.href = finalLink;
        }
        if (fallbackUrl) {
          setTimeout(function () {
            window.location.href = fallbackUrl;
          }, 1000);
        }
        if (fallbackUrl2) {
          setTimeout(function () {
            window.location.href = fallbackUrl2;
          }, 2000);
        }
      })();
    </script>
  </head>
  <body>
    ${noscriptUrl ? `<noscript><meta http-equiv="refresh" content="0;url=${noscriptUrl}" /></noscript>` : ""}
  </body>
</html>`;
}

// ---------------------------------------------------------------------------
// TikTok gateway
// ---------------------------------------------------------------------------

const GATEWAY_COPY = {
  en: {
    title: ["To access the link,", "follow these two simple steps:"],
    tap: "Click on",
    where: "in the top right corner",
    then: "Then ",
    action: "Open in browser",
  },
  fr: {
    title: ["Pour accéder au lien,", "suis ces deux étapes simples:"],
    tap: "Cliquez sur",
    where: "en haut à droite",
    then: "Puis ",
    action: "Ouvrir dans le navigateur",
  },
  es: {
    title: ["Para acceder al enlace,", "sigue estos dos pasos simples :"],
    tap: "Haz clic en",
    where: "en la parte superior derecha",
    then: "Luego ",
    action: "Abrir en el navegador",
  },
  de: {
    title: ["Zum Link zugreifen,", "folge diesen zwei einfachen Schritten:"],
    tap: "Klicken Sie auf",
    where: "in der oberen rechten Ecke",
    then: "dann ",
    action: "im Browser öffnen",
  },
} as const;

export type GatewayLocale = keyof typeof GATEWAY_COPY;

/** Best supported language from an Accept-Language header, English otherwise. */
export function pickGatewayLocale(acceptLanguage: string | null): GatewayLocale {
  const ranked = (acceptLanguage ?? "")
    .split(",")
    .map((entry, index) => {
      const [tag, ...params] = entry.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return {
        lang: tag.trim().toLowerCase().split("-")[0],
        weight: q ? Number(q.slice(2)) : 1,
        index,
      };
    })
    .filter(({ lang, weight }) => lang && weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);

  const match = ranked.find(({ lang }) => Object.hasOwn(GATEWAY_COPY, lang));
  return match ? (match.lang as GatewayLocale) : "en";
}

const FONT_DIR = "/fonts/open-sauce-sans";
const FONT_FILES = { 400: "Regular", 600: "SemiBold", 700: "Bold" } as const;

const GATEWAY_CSS = `
${Object.entries(FONT_FILES)
  .map(
    ([weight, file]) =>
      `@font-face{font-family:OpenSauceSans;src:url(${FONT_DIR}/OpenSauceSans-${file}.ttf) format("truetype");font-weight:${weight};font-style:normal;font-display:swap}`
  )
  .join("\n")}
html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box;-webkit-text-size-adjust:100%}
*,*::before,*::after{box-sizing:inherit}
body{margin:0;position:relative;overflow-x:hidden;max-width:100vw;color:#1D1D1E;background-color:#fff;font-family:OpenSauceSans,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;font-weight:400;font-size:1rem;line-height:1.5;letter-spacing:-0.8px}
p{margin:0}
svg,img{display:block;vertical-align:middle}
.gw{height:100vh;min-height:100vh;max-height:100vh;height:100svh;min-height:100svh;max-height:100svh;background-color:#fff;position:relative}
.gw-pulse{position:fixed;top:-95px;right:-30px;display:flex;align-items:center;justify-content:center}
.gw-pulse-ring{position:absolute;width:160px;height:160px;border-radius:50%;background-color:rgba(52,209,108,.2);animation:gw-pulse 2s ease-in-out infinite}
.gw-pulse-core{width:120px;height:120px;border-radius:50%;background-color:rgba(52,209,108,.34);z-index:1}
.gw-arrows{position:fixed;top:46px;right:16px;display:flex;flex-direction:column;gap:0}
.gw-arrow{animation:gw-arrows 2s infinite}
.gw-arrow:nth-child(1){opacity:1;animation-delay:0s}
.gw-arrow:nth-child(2){opacity:.7;animation-delay:.2s}
.gw-arrow:nth-child(3){opacity:.5;animation-delay:.4s}
.gw-content{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:24px;min-height:100%;height:100%;margin:0 16px}
.gw-title{margin:0 0 32px;font-size:24px;font-weight:600;line-height:normal}
.gw-steps{display:flex;flex-direction:column;gap:24px}
.gw-step{display:flex;align-items:flex-start;gap:16px}
.gw-num{width:32px;height:32px;border:1px solid #000;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700;font-size:16px}
.gw-text{padding-top:4px}
.gw-dots{display:inline-block;vertical-align:middle;margin:0 8px;line-height:0}
.gw-cta{color:#34D16C;font-weight:700;font-size:16px}
.gw-footer{position:fixed;bottom:42px;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:8px;color:#9E9E9E;font-size:14px;text-decoration:none}
@media (max-height:360px){.gw-footer{display:none}}
@keyframes gw-pulse{0%{transform:translate(0) scale(.3);opacity:.7}50%{transform:scale(1.2)}to{transform:translate(0) scale(1);opacity:0}}
@keyframes gw-arrows{0%{opacity:0;transform:translateY(8px)}50%{opacity:inherit;transform:translateY(0)}to{opacity:0;transform:translateY(-8px)}}
`;

const ARROW = `<div class="gw-arrow"><svg width="35" height="19" viewBox="0 0 35 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33.2128 17.1075L17.8126 1.70731C17.4221 1.31678 16.7889 1.31678 16.3984 1.70731L0.998147 17.1075" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;

const DOTS = `<svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="2" r="2" fill="#1D1D1E"/><circle cx="10" cy="2" r="2" fill="#1D1D1E"/><circle cx="2" cy="2" r="2" fill="#1D1D1E"/></svg>`;

/**
 * Shown inside TikTok: arrows and a pulsing halo point at TikTok's "⋯" menu
 * (top right), with the two steps to reopen the link in the real browser.
 */
export function renderGatewayPage(link: SmartLink, origin: string, locale: GatewayLocale): string {
  const copy = GATEWAY_COPY[locale];
  const fontPreloads = Object.values(FONT_FILES)
    .map(
      (file) =>
        `<link rel="preload" href="${FONT_DIR}/OpenSauceSans-${file}.ttf" as="font" type="font/ttf" crossorigin />`
    )
    .join("\n    ");
  return `<!DOCTYPE html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    ${metaTags(link, origin)}
    ${fontPreloads}
    <style>${GATEWAY_CSS}</style>
  </head>
  <body>
    <main class="gw">
      <div class="gw-pulse" aria-hidden="true"><div class="gw-pulse-ring"></div><div class="gw-pulse-core"></div></div>
      <div class="gw-arrows" aria-hidden="true">${ARROW}${ARROW}${ARROW}</div>
      <div class="gw-content">
        <p class="gw-title">${copy.title[0]}<br />${copy.title[1]}</p>
        <div class="gw-steps">
          <div class="gw-step">
            <div class="gw-num">1</div>
            <p class="gw-text">${copy.tap}<span class="gw-dots" role="img" aria-label="⋯">${DOTS}</span> ${copy.where}</p>
          </div>
          <div class="gw-step">
            <div class="gw-num">2</div>
            <p class="gw-text">${copy.then}<span class="gw-cta">&quot;${copy.action}&quot;</span></p>
          </div>
        </div>
      </div>
      <a class="gw-footer" href="/"><span>Powered by</span><img src="/images/DevJ2K.png" alt="DevJ2K" width="114" height="27" /></a>
    </main>
  </body>
</html>`;
}
