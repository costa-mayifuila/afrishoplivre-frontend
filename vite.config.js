import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    rollupOptions: {
      external: (id) => {
        const ignorar = ['fs', 'path', 'pdfkit', 'firebase-admin', 'os', 'stream'];
        const match = ignorar.some(pkg => id.includes(pkg));
        if (match) {
          console.warn(`🛑 Vite: externalizando "${id}"`);
        }
        return match;
      }
    }
  }
});
