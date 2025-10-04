import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/shared/styles/_breakpoints.scss" as *;
          @use "@/shared/styles/_mixins.scss" as *;
          @use "@/shared/styles/_variables.scss" as *;
        `,
      },
    },
  },
  build: {
    sourcemap: true,
  },
});
