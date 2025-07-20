import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    rollupOptions: {
      external: (id) => {
        const externos = ['fs', 'path', 'pdfkit', 'firebase-admin']
        const deveIgnorar = externos.some(pkg => id.includes(pkg))
        if (deveIgnorar) {
          console.warn(`🛑 Ignorando pacote no build: ${id}`)
        }
        return deveIgnorar
      }
    }
  }
})
