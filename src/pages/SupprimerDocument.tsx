
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { titreFoncierService } from '@/services/api';
import { TitreFoncier } from '@/types/document';
import { FileMinus, Search, AlertTriangle, Check, Trash2 } from 'lucide-react';

const SupprimerDocument: React.FC = () => {
  const { toast } = useToast();
  const [documentId, setDocumentId] = useState('');
  const [document, setDocument] = useState<TitreFoncier | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

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
    
    setIsSearching(true);
    setIsDeleted(false);
    try {
      const response = await titreFoncierService.recupererTitreFoncier(documentId);
      
      if (response.succes && response.donnees) {
        setDocument(response.donnees);
        setIsConfirming(false);
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
      setIsSearching(false);
    }
  };

  const handleSupprimer = async () => {
    if (!document) return;
    
    setIsLoading(true);
    try {
      const response = await titreFoncierService.supprimerTitreFoncier(document.id);
      
      if (response.succes) {
        setIsDeleted(true);
        setIsConfirming(false);
        toast({
          title: "Document supprimé",
          description: "Le document a été supprimé avec succès",
        });
      } else {
        toast({
          title: "Erreur",
          description: response.erreur || "Erreur lors de la suppression du document",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du document:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setDocumentId('');
    setDocument(null);
    setIsConfirming(false);
    setIsDeleted(false);
  };

  return (
    <div className="conteneur-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Supprimer un document</h1>
        <p className="text-muted-foreground">
          Recherchez un document par son identifiant pour le supprimer du système
        </p>
      </div>

      {!document && !isDeleted && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Rechercher un document
            </CardTitle>
            <CardDescription>
              Entrez l'identifiant unique du document que vous souhaitez supprimer
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
              <Button type="submit" disabled={isSearching}>
                {isSearching ? (
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
      )}

      {document && !isDeleted && !isConfirming && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <FileMinus className="mr-2 h-5 w-5" />
                Document trouvé
              </CardTitle>
              <Button variant="outline" size="sm" onClick={resetForm}>
                Nouvelle recherche
              </Button>
            </div>
            <CardDescription>
              Vérifiez les informations du document avant de confirmer la suppression
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">ID</p>
                  <p>{document.id.slice(0, 10) + "..."}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Propriétaire</p>
                  <p>{document.metadata.proprietaire}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Adresse</p>
                  <p>{document.metadata.adresse}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Montant</p>
                  {/*<p>{document.montant.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>*/}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Fichier</p>
                  <p>{document.metadata.nom}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                  {/*<p>{new Date(document.date).toLocaleDateString('fr-FR')}</p>*/}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={() => setIsConfirming(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer ce document
            </Button>
          </CardFooter>
        </Card>
      )}

      {isConfirming && !isDeleted && (
        <Card className="border-destructive animate-fade-in">
          <CardHeader className="bg-destructive/10">
            <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center mb-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle>Confirmer la suppression</CardTitle>
            <CardDescription>
              Cette action est irréversible. Le document sera supprimé définitivement du système.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Attention</AlertTitle>
              <AlertDescription>
                Vous êtes sur le point de supprimer le document #{document?.id}. Cette action ne peut pas être annulée.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsConfirming(false)}>
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleSupprimer}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                  Suppression...
                </div>
              ) : (
                <div className="flex items-center">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Confirmer la suppression
                </div>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      {isDeleted && (
        <Card className="animate-slide-in">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-2">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Document supprimé avec succès</CardTitle>
            <CardDescription>
              Le document a été supprimé du système
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Le document avec l'identifiant <span className="font-medium">{document?.id}</span> a été supprimé avec succès.
              Cette action a été enregistrée sur la blockchain pour assurer la traçabilité.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={resetForm} className="w-full">
              Supprimer un autre document
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default SupprimerDocument;
