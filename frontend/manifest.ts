import packageJson from "./package.json";

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: "Complementary Devil's Advocate",
  default_locale: "en",
  version: packageJson.version,
  description:
    "Con plays devil's advocate to complement your understanding of the world as we read the news by challenging you to thoughtfully engage with opposing views. Con wishes for a more informed and less polarized society, one chrome extension download at a time.",
  options_page: "src/pages/options/index.html",
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "ConLogo.png",
  },
  permissions: ["storage"],
  icons: {
    "128": "ConLogo.png",
    "64": "ConLogo.png",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      css: ["assets/css/contentStyle.chunk.css"],
    },
  ],
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css", "ConLogo.png"],
      matches: ["*://*/*"],
    },
  ],
};

export default manifest;
