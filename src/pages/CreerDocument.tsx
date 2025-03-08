import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import DocumentForm from '@/components/document-form/DocumentForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePlus, Check } from 'lucide-react';
import { titreFoncierService } from '@/services/api';

// Type pour représenter la confirmation avec la structure correcte
type DocumentConfirmation = {
  id: string;
};

const CreerDocument: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<DocumentConfirmation | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const response = await titreFoncierService.creerTitreFoncier(formData);
      
      if (response.succes && response.donnees) {
        // Extraire l'ID du document de la réponse du service
        setConfirmation({ id: response.donnees.id });
        toast({
          title: "Document créé",
          description: "Le document a été créé avec succès",
        });
      } else {
        toast({
          title: "Erreur",
          description: response.erreur || "Erreur lors de la création du document",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la création du document:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="conteneur-page">
      <div className="mb-8 flex items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Créer un document</h1>
          <p className="text-muted-foreground">
            Téléversez un nouveau document et ajoutez les informations associées
          </p>
        </div>
      </div>
      {confirmation ? (
        <Card className="animate-slide-in">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-2">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Document créé avec succès</CardTitle>
            <CardDescription>
              Votre document a été ajouté au système et enregistré sur la blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-secondary p-4 rounded-md">
              <p className="text-sm font-medium mb-1">Hash du document (preuve blockchain):</p>
              <p className="text-xs font-mono bg-background p-2 rounded border overflow-x-auto">
                {confirmation.id}
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Vous pouvez utiliser ce hash pour vérifier l'authenticité du document ultérieurement
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FilePlus className="mr-2 h-5 w-5" />
              Informations du document
            </CardTitle>
            <CardDescription>
              Tous les champs sont obligatoires sauf indication contraire
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DocumentForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CreerDocument;