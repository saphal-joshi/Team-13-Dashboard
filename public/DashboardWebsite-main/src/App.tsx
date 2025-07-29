import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "./components/ThemeProvider";
import { HighlightProvider } from "./hooks/useGlobalHighlight";
import GlobalHighlighter from "./components/GlobalHighlighter";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <HighlightProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <GlobalHighlighter />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HighlightProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
