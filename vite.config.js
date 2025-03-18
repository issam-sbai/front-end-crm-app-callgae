import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '192.168.100.26', // or use your IP address '192.168.100.26'

  },
});
