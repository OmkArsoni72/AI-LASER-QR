import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
  } catch (error) {
    console.error("Failed to render main app:", error);
    rootElement.innerHTML = '<div class="p-5 text-center"><h1 class="text-2xl font-bold">Loading Error</h1><p>Check console for details</p></div>';
  }
} else {
  document.body.innerHTML = '<div class="p-5 text-center"><h1 class="text-2xl font-bold">Root Element Not Found</h1></div>';
}
