import {Produit} from './produit';

export interface Facture {
    ID: string;
    users_ID: string[];
    done: string;
    produits: Produit[];
}
