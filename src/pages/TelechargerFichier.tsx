
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Search, Download, FileText, FileImage, FileVideo, File, Eye } from 'lucide-react';
import { titreFoncierService } from '@/services/api';

const TelechargerFichier: React.FC = () => {
  const { toast } = useToast();
  const [recherche, setRecherche] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fichiers, setFichiers] = useState<{ id: string; nomFichier: string; type: string; proprietaire: string; date: string }[]>([]);

  // Fonction fictive pour simuler la récupération des fichiers
  const rechercherFichiers = async () => {
    setIsLoading(true);
    try {
      // Normalement nous ferions un appel API ici
      // Mais pour l'exemple, nous simulons une réponse
      setTimeout(() => {
        const resultats = [
          { id: '1', nomFichier: 'contrat-vente.pdf', type: 'pdf', proprietaire: 'Jean Dupont', date: '2023-05-15' },
          { id: '2', nomFichier: 'acte-notarie.docx', type: 'docx', proprietaire: 'Marie Martin', date: '2023-06-22' },
          { id: '3', nomFichier: 'plan-maison.jpg', type: 'jpg', proprietaire: 'Pierre Durand', date: '2023-07-10' },
          { id: '4', nomFichier: 'attestation.pdf', type: 'pdf', proprietaire: 'Sophie Lefebvre', date: '2023-08-05' },
        ].filter(f => f.nomFichier.toLowerCase().includes(recherche.toLowerCase()) || 
                       f.proprietaire.toLowerCase().includes(recherche.toLowerCase()));
        
        setFichiers(resultats);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer les fichiers",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleRecherche = (e: React.FormEvent) => {
    e.preventDefault();
    rechercherFichiers();
  };

  const telechargerFichier = (nomFichier: string) => {
    // En production, nous utiliserions l'URL réelle du serveur
    const url = `/files/${nomFichier}`;
    
    toast({
      title: "Téléchargement démarré",
      description: `Téléchargement de ${nomFichier} en cours...`,
    });
    
    // Simule un téléchargement pour la démo
    setTimeout(() => {
      toast({
        title: "Téléchargement terminé",
        description: `${nomFichier} a été téléchargé avec succès`,
      });
    }, 1500);
  };

  const previsualiserFichier = (id: string, nomFichier: string) => {
    toast({
      title: "Prévisualisation",
      description: `Prévisualisation de ${nomFichier} (fonctionnalité à implémenter)`,
    });
  };

  // Fonction pour obtenir l'icône selon le type de fichier
  const getFileIcon = (fichier: string) => {
    const extension = fichier.split('.').pop()?.toLowerCase();
    
    switch(extension) {
      case 'pdf':
        return <FileText className="h-10 w-10 text-red-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileImage className="h-10 w-10 text-blue-500" />;
      case 'mp4':
      case 'avi':
      case 'mov':
        return <FileVideo className="h-10 w-10 text-purple-500" />;
      default:
        return <File className="h-10 w-10 text-gray-500" />;
    }
  };

  // Démarrer la recherche au chargement de la page
  React.useEffect(() => {
    rechercherFichiers();
  }, []);

  return (
    <div className="conteneur-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Télécharger des fichiers</h1>
        <p className="text-muted-foreground">
          Recherchez et téléchargez des documents stockés dans le système
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Rechercher des fichiers
          </CardTitle>
          <CardDescription>
            Entrez un nom de fichier ou le nom du propriétaire pour filtrer les résultats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRecherche} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Label htmlFor="recherche" className="sr-only">
                Recherche
              </Label>
              <Input
                id="recherche"
                placeholder="Nom du fichier ou propriétaire..."
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className="w-full"
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                  Recherche...
                </div>
              ) : (
                <div className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  Rechercher
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fichiers.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-muted-foreground">
            <File className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <p>Aucun fichier trouvé. Essayez une autre recherche.</p>
          </div>
        ) : (
          fichiers.map((fichier) => (
            <Card key={fichier.id} className="overflow-hidden group hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
              <div className="p-4 flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getFileIcon(fichier.nomFichier)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-lg truncate">{fichier.nomFichier}</h3>
                  <p className="text-sm text-muted-foreground">
                    Propriétaire: {fichier.proprietaire}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Ajouté le: {new Date(fichier.date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div className="flex-shrink-0 space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => previsualiserFichier(fichier.id, fichier.nomFichier)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={() => telechargerFichier(fichier.nomFichier)}
                    className="animate-pulse-subtle hover:animate-none"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TelechargerFichier;
