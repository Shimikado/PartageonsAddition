import {Produit} from './produit';
import {UserInBase} from './userInBase';

export interface Facture {
    ID: string;
    created_date: Date;
    users: UserInBase[];
    done: boolean;
    produits: Produit[];
}
