import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("🚀 Starting AI-LASER-QR...");

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

try {
  createRoot(rootElement).render(<App />);
  console.log("✅ App rendered successfully");
} catch (error) {
  console.error("❌ Failed to render app:", error);
  rootElement.innerHTML = `
    <div style="padding: 2rem; font-family: system-ui; background: #fee2e2; color: #dc2626; text-align: center;">
      <h2>App Failed to Load</h2>
      <p>Error: ${error}</p>
      <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #dc2626; color: white; border: none; border-radius: 4px;">
        Reload Page
      </button>
    </div>
  `;
}
