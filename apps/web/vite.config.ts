import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import 'dotenv/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'import.meta.env.API': JSON.stringify(process.env.API),
    'import.meta.env.AUTHORIZATION': JSON.stringify(process.env.AUTHORIZATION),
  },
});
