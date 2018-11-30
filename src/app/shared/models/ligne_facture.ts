import {Produit} from './produit';

export interface LigneFacture {
    devise: string;
    nom: string;
    prix_total: string;
    produits: Produit[];
}
