import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://modelmirror.ai",
  integrations: [mdx(), sitemap()],
  build: { format: "directory" },
});
