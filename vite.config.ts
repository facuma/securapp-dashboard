import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Importante para despliegues en GitHub Pages si no usas un dominio personalizado o la raíz del repositorio.
  base: '/securapp-dashboard/',
});