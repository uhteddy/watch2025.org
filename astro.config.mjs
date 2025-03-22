// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

import tailwind from '@astrojs/tailwind';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  // Add this line to enable server-side rendering
  output: 'server',
  adapter: cloudflare(),
  integrations: [tailwind(), svelte()],
});