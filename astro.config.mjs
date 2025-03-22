// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  // Add this line to enable server-side rendering
  output: 'static',
  integrations: [tailwind(), svelte(), pagefind()],
});