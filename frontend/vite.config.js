import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { loadEnv } from 'vite'

const env = loadEnv('production', process.cwd(), '')

const HostIP = 'localhost'
const BackendPort = 5000;

const proxyConfig = {
  '/api': {
    target: `http://${HostIP}:${BackendPort}`,
    changeOrigin: true,
    secure: false,
  },
  '/ws': {
    target: `ws://${HostIP}:${BackendPort}`,
    changeOrigin: true,
    secure: false,
    ws: true,
  }
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 80,
    proxy: proxyConfig,
  },
  preview: {
    host: "0.0.0.0",
    port: 80,
    allowedHosts: [
      env.DOMAIN,
      `www.${env.DOMAIN}`,
    ]
  }
})