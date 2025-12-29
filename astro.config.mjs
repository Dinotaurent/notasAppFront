import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server', //  Obligatorio para SSR
  integrations: [solidJs()],
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: node({
    mode: 'standalone' // Genera el servidor para el contenedor
  })
});