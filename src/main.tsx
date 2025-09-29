import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";

// Debug React loading
console.log("🚀 App starting...", { 
  env: import.meta.env.MODE,
  base: import.meta.env.BASE_URL,
  react: !!React,
  createContext: !!React.createContext
});

// Ensure React is available
if (!React || !React.createContext) {
  throw new Error("React not loaded properly - createContext undefined");
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
