import {Produit} from './produit';

export interface Facture {
    ID: string;
    short_ID: string;
    created_date: Date;
    users_ID: string[];
    done: string;
    produits: Produit[];
}
