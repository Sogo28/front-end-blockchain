import React from 'react';
import { TitreFoncier } from '@/types/document';
import { useDocumentForm } from './useDocumentForm';
import DocumentFields from './DocumentFields';
import FileUploadField from './FileUploadField';
import SubmitButton from './SubmitButton';

interface DocumentFormProps {
  initialValues?: Partial<TitreFoncier>;
  onSubmit: (formData: FormData) => Promise<void>;
  isUpdate?: boolean;
  isLoading?: boolean;
}

const DocumentForm: React.FC<DocumentFormProps> = ({
  initialValues = {},
  onSubmit,
  isUpdate = false,
  isLoading = false,
}) => {
  const {
    metadata,
    fichier,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleFileChange,
    handleSubmit
  } = useDocumentForm({ initialValues, onSubmit });

  return (
    <form onSubmit={(e) => handleSubmit(e, isUpdate)} className="space-y-6 animate-fade-in">
      <div className="grid gap-4 py-4">
        <DocumentFields
          metadata={metadata}
          errors={errors}
          touched={touched}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FileUploadField
          isUpdate={isUpdate}
          fichier={fichier}
          nomFichierActuel={metadata.nom}
          error={errors.fichier}
          touched={touched.fichier}
          onFileChange={handleFileChange}
          onBlur={handleBlur}
        />
      </div>
      <SubmitButton isUpdate={isUpdate} isLoading={isLoading} />
    </form>
  );
};

export default DocumentForm;