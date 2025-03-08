import { useState, useCallback, FormEvent } from 'react';
import { TitreFoncier } from '@/types/document';

interface UseDocumentFormProps {
  initialValues?: Partial<TitreFoncier>;
  onSubmit: (formData: FormData) => Promise<void>;
}

export const useDocumentForm = ({ initialValues = {}, onSubmit }: UseDocumentFormProps) => {
  // Initialiser avec des valeurs par défaut
  const [metadata, setMetadata] = useState<TitreFoncier['metadata']>({
    nom: initialValues.metadata?.nom || '',
    type: initialValues.metadata?.type || '',
    taille: initialValues.metadata?.taille || 0,
    hash: initialValues.metadata?.hash || '',
    dateCreation: initialValues.metadata?.dateCreation || new Date().toISOString().split('T')[0],
    description: initialValues.metadata?.description || '',
    adresse: initialValues.metadata?.adresse || '',
    proprietaire: initialValues.metadata?.proprietaire || '',
  });

  const [fichier, setFichier] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Gérer le changement des champs texte
  const handleChange = useCallback((field: string, value: string | number) => {
    const fieldPath = field.split('.');
    
    if (fieldPath.length === 2 && fieldPath[0] === 'metadata') {
      setMetadata(prev => ({
        ...prev,
        [fieldPath[1]]: value
      }));
    }
  }, []);

  // Marquer un champ comme "touché" lorsqu'il perd le focus
  const handleBlur = useCallback((field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    
    // Valider le champ
    validateField(field);
  }, [metadata]);

  // Gérer le changement de fichier
  const handleFileChange = useCallback((file: File | null) => {
    setFichier(file);
    
    if (file) {
      // Mettre à jour les métadonnées automatiques du fichier
      setMetadata(prev => ({
        ...prev,
        nom: file.name,
        type: file.type,
        taille: file.size,
      }));
      
      // Effacer l'erreur de fichier si présente
      setErrors(prev => ({
        ...prev,
        fichier: undefined
      }));
    }
    
    setTouched(prev => ({
      ...prev,
      fichier: true
    }));
  }, []);

  // Valider un champ spécifique
  const validateField = useCallback((field: string) => {
    const newErrors = { ...errors };
    
    // Validation pour les champs requis
    if (field === 'metadata.nom' && !metadata.nom) {
      newErrors[field] = 'Le nom du document est requis';
    } else if (field === 'metadata.proprietaire' && !metadata.proprietaire) {
      newErrors[field] = 'Le propriétaire est requis';
    } else if (field === 'metadata.adresse' && !metadata.adresse) {
      newErrors[field] = 'L\'adresse est requise';
    } else if (field === 'fichier' && !fichier && !metadata.hash) {
      newErrors[field] = 'Le document est requis';
    } else {
      // Si le champ est valide, supprimez l'erreur
      delete newErrors[field];
    }
    
    setErrors(newErrors);
  }, [metadata, fichier]);

  // Valider le formulaire entier
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    if (!metadata.nom) newErrors['metadata.nom'] = 'Le nom du document est requis';
    if (!metadata.proprietaire) newErrors['metadata.proprietaire'] = 'Le propriétaire est requis';
    if (!metadata.adresse) newErrors['metadata.adresse'] = 'L\'adresse est requise';
    if (!fichier && !metadata.hash) newErrors['fichier'] = 'Le document est requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [metadata, fichier]);

  // Soumettre le formulaire
  const handleSubmit = useCallback((e: FormEvent, isUpdate: boolean) => {
    e.preventDefault();
    
    // Marquer tous les champs comme touchés
    const allFields = [
      'metadata.nom', 
      'metadata.proprietaire', 
      'metadata.adresse', 
      'metadata.description', 
      'metadata.dateCreation', 
      'fichier'
    ];
    
    const newTouched = { ...touched };
    allFields.forEach(field => {
      newTouched[field] = true;
    });
    setTouched(newTouched);
    
    // Valider le formulaire
    if (!validateForm()) {
      return;
    }
    
    // Créer l'objet FormData pour l'envoi au serveur
    const formData = new FormData();
    
    // Ajouter les champs au format attendu par l'API
    formData.append('proprietaire', metadata.proprietaire);
    formData.append('description', metadata.description);
    formData.append('adresse', metadata.adresse);
    
    // Ajouter le fichier s'il existe
    if (fichier && (!isUpdate || (isUpdate && fichier))) {
      formData.append('document', fichier);
    }
    
    // Soumettre les données
    onSubmit(formData);
  }, [metadata, fichier, touched, validateForm, onSubmit]);

  return {
    metadata,
    fichier,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleFileChange,
    handleSubmit,
    validateForm
  };
};