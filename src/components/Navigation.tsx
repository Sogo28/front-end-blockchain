
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, FilePlus, FileEdit, FileMinus, Home, Download } from 'lucide-react';

const Navigation: React.FC = () => {
  const liensNavigation = [
    { to: '/', texte: 'Accueil', icone: <Home size={20} /> },
    { to: '/creer', texte: 'Créer', icone: <FilePlus size={20} /> },
    { to: '/consulter', texte: 'Consulter', icone: <FileText size={20} /> },
    { to: '/mettre-a-jour', texte: 'Mettre à jour', icone: <FileEdit size={20} /> },
    { to: '/telecharger', texte: 'Télécharger', icone: <Download size={20} /> },
    { to: '/supprimer', texte: 'Supprimer', icone: <FileMinus size={20} /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-sm bg-background/90 border-b">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <NavLink 
            to="/" 
            className="flex items-center space-x-2 font-medium"
          >
            <FileText className="h-6 w-6" />
            <span className="hidden sm:inline-block font-semibold">GestionDocs</span>
          </NavLink>
        </div>
        <nav className="flex items-center space-x-6 w-full justify-between md:justify-end">
          <div className="flex-1 md:hidden">
            <NavLink 
              to="/" 
              className="flex items-center space-x-2"
            >
              <FileText className="h-6 w-6" />
              <span className="font-semibold">GestionDocs</span>
            </NavLink>
          </div>
          <div className="flex space-x-1 md:space-x-2">
            {liensNavigation.map((lien) => (
              <NavLink
                key={lien.to}
                to={lien.to}
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-sm md:text-base flex items-center transition-all
                  ${isActive 
                    ? 'bg-secondary text-secondary-foreground font-medium' 
                    : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'}
                `}
              >
                <span className="mr-2 md:mr-1.5">{lien.icone}</span>
                <span className="hidden md:inline">{lien.texte}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
