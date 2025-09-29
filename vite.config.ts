import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Explicit base path so asset URLs resolve correctly in deployment.
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
    // Ensure React is resolved correctly to prevent createContext undefined errors
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Keep React and ReactDOM together to avoid context issues
              if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
              if (id.includes('@radix-ui')) return 'vendor-radix';
              if (id.includes('@tanstack')) return 'vendor-tanstack';
              if (id.includes('recharts')) return 'vendor-charts';
              return 'vendor';
            }
          },
        },
      },
    },
  }));
