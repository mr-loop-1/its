import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  // define: {
  //   'process.env': loadEnv(mode, process.cwd(), ''),
  // },
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: 'api', replacement: '/api' },
    ],
  },
});
