
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Accueil from "./pages/Accueil";
import CreerDocument from "./pages/CreerDocument";
import ConsulterDocument from "./pages/ConsulterDocument";
import MettreAJourDocument from "./pages/MettreAJourDocument";
import SupprimerDocument from "./pages/SupprimerDocument";
import TelechargerFichier from "./pages/TelechargerFichier";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <main className="min-h-screen pt-16 bg-gradient-to-b from-background to-background/90">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/creer" element={<CreerDocument />} />
            <Route path="/consulter" element={<ConsulterDocument />} />
            <Route path="/mettre-a-jour" element={<MettreAJourDocument />} />
            <Route path="/telecharger" element={<TelechargerFichier />} />
            <Route path="/supprimer" element={<SupprimerDocument />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
