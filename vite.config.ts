import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Explicit base path so asset URLs resolve correctly in deployment.
  // If you ever deploy under a sub-path (e.g. /app), change this to that path or to './'.
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
    build: {
      chunkSizeWarningLimit: 2000, // Increase limit to 2000 KB
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'vendor-react';
              if (id.includes('@mui')) return 'vendor-mui';
              if (id.includes('chart.js')) return 'vendor-chartjs';
              return 'vendor';
            }
          },
        },
      },
    },
  }));
