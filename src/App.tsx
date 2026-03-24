import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index.tsx";
import Contacto from "./pages/Contacto.tsx";
import Grupo from "./pages/Grupo.tsx";
import Tecnologias from "./pages/Tecnologias.tsx";
import Sectores from "./pages/Sectores.tsx";
import Calidad from "./pages/Calidad.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/grupo" element={<Grupo />} />
            <Route path="/tecnologias" element={<Tecnologias />} />
            <Route path="/sectores" element={<Sectores />} />
            <Route path="/calidad" element={<Calidad />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
