import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Content-Security-Policy": "default-src 'self' 'unsafe-inline' http://localhost:5000"
    }
  }
});