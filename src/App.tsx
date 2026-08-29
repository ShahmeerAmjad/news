import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SmoothScroll } from "@/components/lux/SmoothScroll";
import { Suspense, lazy } from "react";

// Every route is split. The flyer QR sends village traffic straight to /draw on
// 3G, so that page must not download the home page's images and sections first.
const Index = lazy(() => import("./pages/Index"));
const Offer = lazy(() => import("./pages/Offer"));
const Draw = lazy(() => import("./pages/Draw"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner
        position="top-center"
        toastOptions={{
          style: {
            background: "#012a44",
            border: "1px solid rgba(228,193,82,0.3)",
            color: "#f8f4ea",
          },
        }}
      />
      <SmoothScroll />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-navy-950" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/offer" element={<Offer />} />
            <Route path="/draw" element={<Draw />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
