import axios from 'axios';
import { TitreFoncier, ReponseAPI } from '../types/document';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Changed to match backend PORT
  timeout: 10000 * 3,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercepteur pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erreur API:', error);
    return Promise.reject(error);
  }
);

// Service pour les documents (titres fonciers)
export const titreFoncierService = {
  // Créer un nouveau titre foncier
  creerTitreFoncier: async (formData: FormData): Promise<ReponseAPI<{ id: string }>> => {
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      const response = await api.post('/titresFonciers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 10000 * 3
      });
      return {
        succes: true,
        donnees: {
          id: response.data.id
        }
      };
    } catch (error: any) {
      return {
        succes: false,
        erreur: error.response?.data?.error || 'Erreur lors de la création du titre foncier',
      };
    }
  },

  // Récupérer un titre foncier par son ID
  recupererTitreFoncier: async (id: string): Promise<ReponseAPI<TitreFoncier>> => {
    try {
      const response = await api.get(`/titresFonciers/${id}`);
      return {
        succes: true,
        donnees: response.data
      };
    } catch (error: any) {
      return {
        succes: false,
        erreur: error.response?.data?.error || 'Titre foncier non trouvé',
      };
    }
  },

  // Récupérer tous les titres fonciers
  recupererTousTitresFonciers: async (): Promise<ReponseAPI<TitreFoncier[]>> => {
    try {
      const response = await api.get('/titresFonciers');
      return {
        succes: true,
        donnees: response.data
      };
    } catch (error: any) {
      return {
        succes: false,
        erreur: error.response?.data?.error || 'Erreur lors de la récupération des titres fonciers',
      };
    }
  },

  // Mettre à jour un titre foncier (avec ou sans fichier)
  mettreAJourTitreFoncier: async (id: string, data: any): Promise<ReponseAPI<TitreFoncier>> => {
    try {
      let response;
      
      // Si les données sont de type FormData (avec fichier potentiel)
      if (data instanceof FormData) {
        response = await api.put(`/titresFonciers/${id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 10000 * 3
        });
      } else {
        // Sinon, c'est un objet JSON standard
        response = await api.put(`/titresFonciers/${id}`, data);
      }
      
      return {
        succes: true,
        donnees: response.data
      };
    } catch (error: any) {
      return {
        succes: false,
        erreur: error.response?.data?.error || 'Erreur lors de la mise à jour du titre foncier',
      };
    }
  },

  // Supprimer un titre foncier
  supprimerTitreFoncier: async (id: string): Promise<ReponseAPI<any>> => {
    try {
      const response = await api.delete(`/titresFonciers/${id}`);
      return {
        succes: true,
        donnees: response.data
      };
    } catch (error: any) {
      return {
        succes: false,
        erreur: error.response?.data?.error || 'Erreur lors de la suppression du titre foncier',
      };
    }
  },

  // Transférer un titre foncier
  transfererTitreFoncier: async (id: string, nouveauProprietaire: string, prix?: string): Promise<ReponseAPI<any>> => {
    try {
      const response = await api.post(`/titresFonciers/${id}/transfert`, { nouveauProprietaire, prix });
      return {
        succes: true,
        donnees: response.data
      };
    } catch (error: any) {
      return {
        succes: false,
        erreur: error.response?.data?.error || 'Erreur lors du transfert du titre foncier',
      };
    }
  },

  // Vérifier si un titre foncier existe
  verifierExistenceTitreFoncier: async (id: string): Promise<ReponseAPI<{ id: string, exists: boolean }>> => {
    try {
      const response = await api.get(`/titresFonciers/${id}/exists`);
      return {
        succes: true,
        donnees: response.data
      };
    } catch (error: any) {
      return {
        succes: false,
        erreur: error.response?.data?.error || 'Erreur lors de la vérification d\'existence',
      };
    }
  },

  // Récupérer les titres fonciers d'un propriétaire
  recupererTitresFonciersParProprietaire: async (proprietaire: string): Promise<ReponseAPI<TitreFoncier[]>> => {
    try {
      const response = await api.get(`/titresFonciers/proprietaire/${proprietaire}`);
      return {
        succes: true,
        donnees: response.data
      };
    } catch (error: any) {
      return {
        succes: false,
        erreur: error.response?.data?.error || 'Erreur lors de la récupération des titres fonciers',
      };
    }
  },

  // Vérifier l'authenticité d'un titre foncier
  verifierAuthenticiteTitreFoncier: async (id: string): Promise<ReponseAPI<any>> => {
    try {
      const response = await api.get(`/titresFonciers/${id}/authenticity`);
      return {
        succes: true,
        donnees: response.data
      };
    } catch (error: any) {
      return {
        succes: false,
        erreur: error.response?.data?.error || 'Erreur lors de la vérification d\'authenticité',
      };
    }
  },

  // Récupérer l'historique d'un titre foncier
  recupererHistoriqueTitreFoncier: async (id: string): Promise<ReponseAPI<any>> => {
    try {
      const response = await api.get(`/titresFonciers/${id}/history`);
      return {
        succes: true,
        donnees: response.data
      };
    } catch (error: any) {
      return {
        succes: false,
        erreur: error.response?.data?.error || 'Erreur lors de la récupération de l\'historique',
      };
    }
  }
};