import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileEdit } from 'lucide-react';
import DocumentForm from '@/components/document-form/DocumentForm';
import { TitreFoncier } from '@/types/document';

interface DocumentUpdateFormProps {
  document: TitreFoncier;
  isLoading: boolean;
  onUpdate: (formData: FormData) => Promise<void>;
  onResetForm: () => void;
}

const DocumentUpdateForm: React.FC<DocumentUpdateFormProps> = ({
  document,
  isLoading,
  onUpdate,
  onResetForm
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <FileEdit className="mr-2 h-5 w-5" />
            Modifier le titre foncier #{document.id.slice(0, 10) + "..."}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onResetForm}>
            Nouvelle recherche
          </Button>
        </div>
        <CardDescription>
          Modifiez les informations du titre foncier et soumettez le formulaire pour enregistrer les changements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DocumentForm
          initialValues={document}
          onSubmit={onUpdate}
          isUpdate={true}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};

export default DocumentUpdateForm;