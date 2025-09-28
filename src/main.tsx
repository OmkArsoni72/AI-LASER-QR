import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import "./index.css";

console.log("Main.tsx: Starting app initialization");
console.log("Main.tsx: Environment:", import.meta.env.MODE);

const rootElement = document.getElementById("root");
console.log("Main.tsx: Root element found:", !!rootElement);

if (rootElement) {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  console.log("Main.tsx: App rendered successfully");
} else {
  console.error("Main.tsx: Root element not found!");
}
