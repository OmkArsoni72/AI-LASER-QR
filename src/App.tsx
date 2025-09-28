import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/AppSidebar";
import Index from "./pages/Index";
import SimpleIndex from "./pages/SimpleIndex";
import ComponentsPage from "./pages/ComponentsPage";
import ComponentNewPage from "./pages/ComponentNewPage";
import QRGeneratePage from "./pages/QRGeneratePage";
import ScannerPage from "./pages/ScannerPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import VendorsPage from "./pages/VendorsPage";
import WarrantyPage from "./pages/WarrantyPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  try {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<SimpleIndex />} />
              <Route path="/components" element={<div className="p-8"><h1 className="text-2xl font-bold">Components Page</h1></div>} />
              <Route path="/vendors" element={<VendorsPage />} />
              <Route path="/scan" element={<div className="p-8"><h1 className="text-2xl font-bold">Scanner Page</h1></div>} />
              <Route path="*" element={<div className="p-8"><h1 className="text-2xl font-bold">Page Not Found</h1></div>} />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    );
  } catch (error) {
    console.error("App rendering error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Application Error</h1>
          <p>Please check the browser console for details.</p>
        </div>
      </div>
    );
  }
};

export default App;
