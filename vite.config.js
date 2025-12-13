import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    // Habilita/deshabilita la API de Opciones
    __VUE_OPTIONS_API__: true,
    // Deshabilita las herramientas de desarrollador en producción
    __VUE_PROD_DEVTOOLS__: false,
    // Deshabilita los detalles de errores de hidratación en producción
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
  },
  // Exponer variables de entorno al cliente
  envPrefix: 'VITE_'
});
