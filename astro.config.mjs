// @ts-check
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["varies-nobody-latin-extreme.trycloudflare.com"],
    },
  },

  integrations: [icon(), auth()],
});
