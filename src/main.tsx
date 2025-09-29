import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import TestApp from "./TestApp.tsx";
import "./index.css";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";

// Debug info for deployment
console.log("🚀 App starting...", { 
  env: import.meta.env.MODE,
  base: import.meta.env.BASE_URL,
  react: !!React,
  createContext: !!React.createContext,
  timestamp: new Date().toISOString()
});

// Ensure React is available
if (!React || !React.createContext) {
  console.error("❌ React loading failed!");
  document.getElementById("root")!.innerHTML = `
    <div style="padding: 2rem; font-family: system-ui; background: #fee2e2; color: #dc2626; border-radius: 8px; margin: 2rem;">
      <h2>React Loading Error</h2>
      <p>React.createContext is undefined. This usually means:</p>
      <ul>
        <li>Multiple React versions loaded</li>
        <li>Incorrect module resolution</li>
        <li>Bundle corruption</li>
      </ul>
      <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #dc2626; color: white; border: none; border-radius: 4px;">
        Reload
      </button>
    </div>
  `;
  throw new Error("React not loaded properly - createContext undefined");
}

console.log("✅ React loaded successfully, initializing app...");

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// Use TestApp for debugging, switch to full App once working
const useTestApp = !window.location.search.includes('full=true');

createRoot(rootElement).render(
  <ErrorBoundary>
    {useTestApp ? <TestApp /> : <App />}
  </ErrorBoundary>
);
