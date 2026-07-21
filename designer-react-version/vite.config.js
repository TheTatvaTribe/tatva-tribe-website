import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // '/' for local dev and a root-domain deploy. For a sub-path deploy set
  // VITE_BASE to the bare path segment (e.g. VITE_BASE=tatva-tribe-preview);
  // leading/trailing slashes are added here so the value stays shell-safe.
  base: process.env.VITE_BASE ? `/${process.env.VITE_BASE.replace(/^\/+|\/+$/g, '')}/` : '/'
});
