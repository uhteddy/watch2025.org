// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Add this line to enable server-side rendering
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
});