import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { NavLink } from 'react-router-dom';
import { FilePlus, FileText, FileEdit, FileMinus, Database, Download } from 'lucide-react';

const Accueil: React.FC = () => {
  const fonctionnalites = [
    {
      titre: 'Créer un document',
      description: 'Téléversez un nouveau document avec les informations associées',
      icone: <FilePlus className="h-8 w-8" />,
      lien: '/creer',
      couleur: 'bg-blue-50 text-blue-600',
      delai: 'delay-100',
    },
    {
      titre: 'Consulter un document',
      description: 'Recherchez et affichez les détails d\'un document existant',
      icone: <FileText className="h-8 w-8" />,
      lien: '/consulter',
      couleur: 'bg-green-50 text-green-600',
      delai: 'delay-200',
    },
    {
      titre: 'Mettre à jour un document',
      description: 'Modifiez les informations d\'un document existant',
      icone: <FileEdit className="h-8 w-8" />,
      lien: '/mettre-a-jour',
      couleur: 'bg-amber-50 text-amber-600',
      delai: 'delay-300',
    },
    {
      titre: 'Télécharger un fichier',
      description: 'Accédez et téléchargez les documents stockés',
      icone: <Download className="h-8 w-8" />,
      lien: '/telecharger',
      couleur: 'bg-purple-50 text-purple-600',
      delai: 'delay-400',
    },
    {
      titre: 'Supprimer un document',
      description: 'Retirez un document du système',
      icone: <FileMinus className="h-8 w-8" />,
      lien: '/supprimer',
      couleur: 'bg-red-50 text-red-600',
      delai: 'delay-500',
    },
  ];

  return (
    <div className="conteneur-page">
      <div className="max-w-3xl mx-auto text-center mb-12 animate-slide-in">
        <div className="inline-flex items-center justify-center p-3 bg-accent rounded-full mb-4 animate-float">
          <Database className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Gestion de Documents
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Système sécurisé de gestion de documents avec intégration blockchain 
          pour garantir l'intégrité et la traçabilité de vos données.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <Button asChild size="lg" className="btn-hover-effect">
            <NavLink to="/creer">
              <FilePlus className="mr-2 h-5 w-5" />
              Nouveau document
            </NavLink>
          </Button>
          <Button asChild variant="outline" size="lg" className="btn-hover-effect">
            <NavLink to="/consulter">
              <FileText className="mr-2 h-5 w-5" />
              Consulter les documents
            </NavLink>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fonctionnalites.map((fonction, index) => (
          <Card 
            key={index} 
            className={`overflow-hidden transition-all hover:shadow-md hover:translate-y-[-4px] animate-fade-in ${fonction.delai} flex flex-col justify-between`}
          >
            <CardHeader className="flex-grow">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${fonction.couleur}`}>
                {fonction.icone}
              </div>
              <CardTitle>{fonction.titre}</CardTitle>
              <CardDescription>{fonction.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full btn-hover-effect">
                <NavLink to={fonction.lien}>
                  Accéder
                </NavLink>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Accueil;
