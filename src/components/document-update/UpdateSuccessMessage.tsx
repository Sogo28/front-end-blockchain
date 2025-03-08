
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { TitreFoncier } from '@/types/document';

interface UpdateSuccessMessageProps {
  document: TitreFoncier | null;
  onResetForm: () => void;
}

const UpdateSuccessMessage: React.FC<UpdateSuccessMessageProps> = ({ document, onResetForm }) => {
  return (
    <Card className="animate-slide-in">
      <CardHeader>
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-2">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <CardTitle>Document mis à jour avec succès</CardTitle>
        <CardDescription>
          Les modifications ont été enregistrées dans le système et sur la blockchain
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-muted-foreground">
            Le document avec l'identifiant <span className="font-medium">{document?.id}</span> a été mis à jour avec succès.
          </p>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onResetForm}>
              Modifier un autre document
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateSuccessMessage;
