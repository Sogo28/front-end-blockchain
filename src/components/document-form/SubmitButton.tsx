
import React from 'react';
import { Button } from '@/components/ui/button';
import { FilePlus, FileEdit } from 'lucide-react';

interface SubmitButtonProps {
  isUpdate: boolean;
  isLoading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isUpdate, isLoading }) => {
  return (
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
          {isUpdate ? "Mise à jour..." : "Création..."}
        </div>
      ) : (
        <div className="flex items-center">
          {isUpdate ? <FileEdit className="mr-2 h-4 w-4" /> : <FilePlus className="mr-2 h-4 w-4" />}
          {isUpdate ? "Mettre à jour le document" : "Créer le document"}
        </div>
      )}
    </Button>
  );
};

export default SubmitButton;
