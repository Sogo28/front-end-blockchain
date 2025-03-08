import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface DocumentFieldsProps {
  metadata: {
    nom: string;
    type: string;
    taille: number;
    hash: string;
    dateCreation: string;
    description: string;
    adresse: string;
    proprietaire: string;
  };
  errors: {
    'metadata.nom'?: string;
    'metadata.type'?: string;
    'metadata.description'?: string;
    'metadata.adresse'?: string;
    'metadata.proprietaire'?: string;
    'metadata.dateCreation'?: string;
    fichier?: string;
  };
  touched: Record<string, boolean>;
  onChange: (field: string, value: string | number) => void;
  onBlur: (field: string) => void;
}

const DocumentFields: React.FC<DocumentFieldsProps> = ({
  metadata,
  errors,
  touched,
  onChange,
  onBlur,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label 
            htmlFor="metadata.proprietaire" 
            className={errors['metadata.proprietaire'] && touched['metadata.proprietaire'] ? "text-destructive" : ""}
          >
            Propriétaire
          </Label>
          <Input
            id="metadata.proprietaire"
            value={metadata.proprietaire}
            onChange={(e) => onChange('metadata.proprietaire', e.target.value)}
            onBlur={() => onBlur('metadata.proprietaire')}
            placeholder="Identifiant du propriétaire"
            className={`w-full ${errors['metadata.proprietaire'] && touched['metadata.proprietaire'] ? "border-destructive focus-visible:ring-destructive" : ""}`}
            required
          />
          {errors['metadata.proprietaire'] && touched['metadata.proprietaire'] && (
            <p className="text-xs text-destructive mt-1">{errors['metadata.proprietaire']}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label 
            htmlFor="metadata.adresse" 
            className={errors['metadata.adresse'] && touched['metadata.adresse'] ? "text-destructive" : ""}
          >
            Adresse de la propriété
          </Label>
          <Input
            id="metadata.adresse"
            value={metadata.adresse}
            onChange={(e) => onChange('metadata.adresse', e.target.value)}
            onBlur={() => onBlur('metadata.adresse')}
            placeholder="123 rue de l'Exemple, Ville"
            className={`w-full ${errors['metadata.adresse'] && touched['metadata.adresse'] ? "border-destructive focus-visible:ring-destructive" : ""}`}
            required
          />
          {errors['metadata.adresse'] && touched['metadata.adresse'] && (
            <p className="text-xs text-destructive mt-1">{errors['metadata.adresse']}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label 
            htmlFor="metadata.nom" 
            className={errors['metadata.nom'] && touched['metadata.nom'] ? "text-destructive" : ""}
          >
            Nom du document
          </Label>
          <Input
            id="metadata.nom"
            value={metadata.nom}
            onChange={(e) => onChange('metadata.nom', e.target.value)}
            onBlur={() => onBlur('metadata.nom')}
            placeholder="Nom du fichier"
            className={`w-full ${errors['metadata.nom'] && touched['metadata.nom'] ? "border-destructive focus-visible:ring-destructive" : ""}`}
            required
          />
          {errors['metadata.nom'] && touched['metadata.nom'] && (
            <p className="text-xs text-destructive mt-1">{errors['metadata.nom']}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label 
            htmlFor="metadata.dateCreation" 
            className={errors['metadata.dateCreation'] && touched['metadata.dateCreation'] ? "text-destructive" : ""}
          >
            Date de création
          </Label>
          <Input
            id="metadata.dateCreation"
            type="date"
            value={metadata.dateCreation.split('T')[0]} // Handle ISO date format
            onChange={(e) => onChange('metadata.dateCreation', e.target.value)}
            onBlur={() => onBlur('metadata.dateCreation')}
            className={`w-full ${errors['metadata.dateCreation'] && touched['metadata.dateCreation'] ? "border-destructive focus-visible:ring-destructive" : ""}`}
            required
          />
          {errors['metadata.dateCreation'] && touched['metadata.dateCreation'] && (
            <p className="text-xs text-destructive mt-1">{errors['metadata.dateCreation']}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label 
          htmlFor="metadata.description" 
          className={errors['metadata.description'] && touched['metadata.description'] ? "text-destructive" : ""}
        >
          Description
        </Label>
        <Textarea
          id="metadata.description"
          value={metadata.description}
          onChange={(e) => onChange('metadata.description', e.target.value)}
          onBlur={() => onBlur('metadata.description')}
          placeholder="Description du document"
          className={`w-full ${errors['metadata.description'] && touched['metadata.description'] ? "border-destructive focus-visible:ring-destructive" : ""}`}
          rows={3}
        />
        {errors['metadata.description'] && touched['metadata.description'] && (
          <p className="text-xs text-destructive mt-1">{errors['metadata.description']}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="metadata.type">
            Type de document
          </Label>
          <Input
            id="metadata.type"
            value={metadata.type}
            onChange={(e) => onChange('metadata.type', e.target.value)}
            placeholder="application/pdf"
            className="w-full"
            disabled
          />
          <p className="text-xs text-muted-foreground">Rempli automatiquement lors du téléchargement</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="metadata.taille">
            Taille du fichier
          </Label>
          <Input
            id="metadata.taille"
            value={metadata.taille > 0 ? `${(metadata.taille / 1024).toFixed(2)} KB` : ''}
            className="w-full"
            disabled
          />
          <p className="text-xs text-muted-foreground">Rempli automatiquement lors du téléchargement</p>
        </div>
      </div>

      {/* Hash field - Read-only, filled automatically */}
      <div className="space-y-2">
        <Label htmlFor="metadata.hash">
          Hash du document
        </Label>
        <Input
          id="metadata.hash"
          value={metadata.hash}
          className="w-full font-mono text-sm"
          disabled
        />
        <p className="text-xs text-muted-foreground">Signature numérique unique du document générée automatiquement</p>
      </div>
    </>
  );
};

export default DocumentFields;