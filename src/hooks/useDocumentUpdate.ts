import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { titreFoncierService } from '@/services/api';
import { TitreFoncier } from '@/types/document';

export const useTitreFoncierUpdate = () => {
  const { toast } = useToast();
  const [documentId, setDocumentId] = useState('');
  const [document, setDocument] = useState<TitreFoncier | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleDocumentIdChange = (value: string) => {
    setDocumentId(value);
  };

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
    setIsUpdated(false);
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
      setIsSearching(false);
    }
  };

  const handleMiseAJour = async (formData: FormData) => {
    if (!document) return;
    
    setIsLoading(true);
    try {
      // Check if there's a file in the FormData
      const hasFile = formData.has('fichier') && 
                      formData.get('fichier') instanceof File && 
                      (formData.get('fichier') as File).size > 0;
      
      let response;
      
      if (hasFile) {
        // If there's a file, we need to use multipart/form-data
        // You might need to modify your API to handle file uploads during updates
        // Similar to how creerTitreFoncier works
        response = await titreFoncierService.creerTitreFoncier(formData);
      } else {
        // If no file, convert FormData to a plain object for JSON submission
        const formDataObject: Record<string, any> = {};
        formData.forEach((value, key) => {
          if (!(value instanceof File)) {
            formDataObject[key] = value;
          }
        });
        
        response = await titreFoncierService.mettreAJourTitreFoncier(document.id, formDataObject);
      }
      
      if (response.succes) {
        setIsUpdated(true);
        toast({
          title: "Document mis à jour",
          description: "Le document a été mis à jour avec succès",
        });
      } else {
        toast({
          title: "Erreur",
          description: response.erreur || "Erreur lors de la mise à jour du document",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du document:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setDocumentId('');
    setDocument(null);
    setIsUpdated(false);
  };

  return {
    documentId,
    document,
    isLoading,
    isSearching,
    isUpdated,
    handleDocumentIdChange,
    handleRecherche,
    handleMiseAJour,
    resetForm
  };
};