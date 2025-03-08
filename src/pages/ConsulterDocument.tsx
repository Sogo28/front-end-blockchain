
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { titreFoncierService } from '@/services/api';
import { TitreFoncier } from '@/types/document';
import { FileText, Download, Search, Database, Calendar, Home, User, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const ConsulterDocument: React.FC = () => {
  const { toast } = useToast();
  const [documentId, setDocumentId] = useState('');
  const [document, setDocument] = useState<TitreFoncier | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecherche = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!documentId.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un identifiant de document",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await titreFoncierService.recupererTitreFoncier(documentId);
      
      if (response.succes && response.donnees) {
        setDocument(response.donnees);
      } else {
        setDocument(null);
        toast({
          title: "Document non trouvé",
          description: response.erreur || "Aucun document trouvé avec cet identifiant",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la recherche du document:", error);
      setDocument(null);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la recherche du document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP', { locale: fr });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="conteneur-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Consulter un document</h1>
        <p className="text-muted-foreground">
          Recherchez un document par son identifiant pour afficher ses détails
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Rechercher un document
          </CardTitle>
          <CardDescription>
            Entrez l'identifiant unique du document que vous souhaitez consulter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRecherche} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Label htmlFor="documentId" className="sr-only">
                Identifiant du document
              </Label>
              <Input
                id="documentId"
                placeholder="Identifiant du document"
                value={documentId}
                onChange={(e) => setDocumentId(e.target.value)}
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

      {document && (
        <Card className="animate-slide-in">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Détails du document
            </CardTitle>
            <CardDescription>
              Informations complètes sur le document #{document.id}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground flex items-center mb-1">
                    <User className="mr-2 h-4 w-4" />
                    Propriétaire
                  </h3>
                  <p className="text-foreground">{document.metadata.proprietaire}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground flex items-center mb-1">
                    <Home className="mr-2 h-4 w-4" />
                    Adresse de la propriété
                  </h3>
                  <p className="text-foreground">{document.metadata.adresse}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground flex items-center mb-1">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Montant
                  </h3>
                  {/*<p className="text-foreground">{document.metadata.adresse.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>*/}

                </div>
                
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground flex items-center mb-1">
                    <Calendar className="mr-2 h-4 w-4" />
                    Date
                  </h3>
                  {/*<p className="text-foreground">{formatDate(document.date)}</p>*/}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground flex items-center mb-1">
                    <FileText className="mr-2 h-4 w-4" />
                    Nom du fichier
                  </h3>
                  <p className="text-foreground">{document.metadata.nom}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground flex items-center mb-1">
                    <Database className="mr-2 h-4 w-4" />
                    Hash blockchain
                  </h3>
                  <p className="text-xs font-mono bg-secondary p-2 rounded border overflow-x-auto">
                    {document.metadata.hash}
                  </p>
                </div>
                
                <div className="pt-2">
                  <Button asChild className="w-full">
                    <a 
                      href={document.chemin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le document
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConsulterDocument;
