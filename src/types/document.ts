export interface TitreFoncier {
  id: string;           // hash du fichier (hashFichier) qui sert d'identifiant
  metadata: {
    nom: string;        // nom original du fichier
    type: string;       // mimetype du fichier
    taille: number;     // taille du fichier en octets
    hash: string;       // hash SHA-256 du fichier
    dateCreation: string; // date ISO de création
    description: string; // description optionnelle
    adresse: string;    // adresse de la propriété
    proprietaire: string; // identifiant du propriétaire
  };
  chemin?: string;      // chemin du fichier stocké
}

export interface HistoriqueTransaction {
  date: string;
  type: string;         // 'creation', 'transfert', 'mise à jour', 'suppression'
  proprietairePrecedent?: string;
  nouveauProprietaire?: string;
  prix?: string;
  details?: any;
}

export interface ResultatAuthenticite {
  estAuthentique: boolean;
  message: string;
  details?: any;
}

export interface ReponseAPI<T> {
  succes: boolean;
  donnees?: T;
  message?: string;
  erreur?: string;
}