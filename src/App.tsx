import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/AppSidebar";
import Index from "./pages/Index";
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
  console.log("🔧 App component rendering...");
  
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter 
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Header />
              <main className="flex-1 overflow-auto p-2 sm:p-4 lg:p-6">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/components" element={<ComponentsPage />} />
                  <Route path="/components/new" element={<ComponentNewPage />} />
                  <Route path="/qr/generate" element={<QRGeneratePage />} />
                  <Route path="/scan" element={<ScannerPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/vendors" element={<VendorsPage />} />
                  <Route path="/warranty" element={<WarrantyPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
