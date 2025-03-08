
import React from 'react';
import DocumentSearchForm from '@/components/document-update/DocumentSearchForm';
import DocumentUpdateForm from '@/components/document-update/DocumentUpdateForm';
import UpdateSuccessMessage from '@/components/document-update/UpdateSuccessMessage';
import { useTitreFoncierUpdate } from '@/hooks/useDocumentUpdate';

const MettreAJourDocument: React.FC = () => {
  const {
    documentId,
    document,
    isLoading,
    isSearching,
    isUpdated,
    handleDocumentIdChange,
    handleRecherche,
    handleMiseAJour,
    resetForm
  } = useTitreFoncierUpdate();

  return (
    <div className="conteneur-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mettre à jour un document</h1>
        <p className="text-muted-foreground">
          Recherchez un document par son identifiant pour le modifier
        </p>
      </div>

      {!document && (
        <DocumentSearchForm
          documentId={documentId}
          isSearching={isSearching}
          onDocumentIdChange={handleDocumentIdChange}
          onSearch={handleRecherche}
        />
      )}

      {document && !isUpdated && (
        <DocumentUpdateForm
          document={document}
          isLoading={isLoading}
          onUpdate={handleMiseAJour}
          onResetForm={resetForm}
        />
      )}

      {isUpdated && (
        <UpdateSuccessMessage
          document={document}
          onResetForm={resetForm}
        />
      )}
    </div>
  );
};

export default MettreAJourDocument;
