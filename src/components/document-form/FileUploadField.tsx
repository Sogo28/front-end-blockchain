
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check, Upload, X } from 'lucide-react';

interface FileUploadFieldProps {
  isUpdate: boolean;
  fichier: File | null;
  nomFichierActuel: string;
  error?: string;
  touched?: boolean;
  onFileChange: (file: File | null) => void;
  onBlur?: (field: string) => void;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  isUpdate,
  fichier,
  nomFichierActuel,
  error,
  touched,
  onFileChange,
  onBlur,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="fichier" className={error && touched ? "text-destructive" : ""}>
        {isUpdate ? "Remplacer le fichier (optionnel)" : "Document à téléverser"}
      </Label>
      
      {isUpdate && nomFichierActuel && (
        <div className="text-sm text-muted-foreground mb-2">
          Fichier actuel : {nomFichierActuel}
        </div>
      )}
      
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="fichier"
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/30 hover:bg-secondary/50 transition-all ${
            error && touched ? "border-destructive bg-destructive/10 hover:bg-destructive/20" : "border-secondary"
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {fichier ? (
              <>
                <Check className="w-8 h-8 mb-3 text-primary" />
                <p className="mb-2 text-sm text-foreground truncate max-w-xs">
                  <span className="font-semibold">{fichier.name}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {(fichier.size / 1024).toFixed(2)} KB
                </p>
              </>
            ) : (
              <>
                <Upload className={`w-8 h-8 mb-3 ${error && touched ? "text-destructive" : "text-muted-foreground"}`} />
                <p className="mb-2 text-sm text-foreground">
                  <span className="font-semibold">Cliquez pour téléverser</span> ou glissez-déposez
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, DOC, DOCX, JPG (MAX. 10 MB)
                </p>
              </>
            )}
          </div>
          <Input
            id="fichier"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            onBlur={() => onBlur && onBlur('fichier')}
            accept=".pdf,.doc,.docx,.jpg,.jpeg"
            required={!isUpdate}
          />
        </label>
      </div>
      
      {error && touched && (
        <p className="text-xs text-destructive mt-1">{error}</p>
      )}
      
      {fichier && (
        <div className="flex items-center mt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => onFileChange(null)}
          >
            <X className="mr-1 h-3 w-3" /> Supprimer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploadField;
