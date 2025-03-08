
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

interface DocumentSearchFormProps {
  documentId: string;
  isSearching: boolean;
  onDocumentIdChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => Promise<void>;
}

const DocumentSearchForm: React.FC<DocumentSearchFormProps> = ({
  documentId,
  isSearching,
  onDocumentIdChange,
  onSearch,
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="mr-2 h-5 w-5" />
          Rechercher un document
        </CardTitle>
        <CardDescription>
          Entrez l'identifiant unique du document que vous souhaitez mettre à jour
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Label htmlFor="documentId" className="sr-only">
              Identifiant du document
            </Label>
            <Input
              id="documentId"
              placeholder="Identifiant du document"
              value={documentId}
              onChange={(e) => onDocumentIdChange(e.target.value)}
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
  );
};

export default DocumentSearchForm;
