// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import pagefind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Add this line to enable server-side rendering
  output: 'static',
  site: 'https://watch2025.org',
  integrations: [tailwind(), svelte(), pagefind(), sitemap()],
});