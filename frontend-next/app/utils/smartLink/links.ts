import type { SmartLink } from "./resolve";

/**
 * App Store Connect campaign link (Analytics → Acquisition → Campaigns),
 * without its `ct`: the campaign is added per visitor (see `campaigns`).
 */
const ACT_APP_STORE = "https://apps.apple.com/app/apple-store/id6757723423?pt=126116317&mt=8";

/** devj2k.com/ACT and devj2k.com/ACT. — same setup as taap.it/ccK6SI1. */
export const ACT_LINK: SmartLink = {
  path: "/ACT",
  targets: {
    ios: ACT_APP_STORE,
    android: null,
    desktop: null,
    other: ACT_APP_STORE,
  },
  fallback: ACT_APP_STORE,
  appName: "ACT.",
  // App Store Connect campaigns, by app the link is opened from.
  campaigns: {
    tiktok: "Bio Tiktok",
    instagram: "Bio Instagram",
  },
  meta: {
    lang: "fr",
    title: "App ACT. - Bloque tes Apps & Focus - App Store",
    description:
      "Téléchargez l’app ACT. - Bloque tes Apps & Focus développée par Theo Ajavon dans l’App Store. Consultez les captures d’écran, les notes et avis, les astuces…",
    image: "/images/act/og.jpeg",
  },
};
