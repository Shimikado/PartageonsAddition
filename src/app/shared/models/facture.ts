import {LigneFacture} from './ligne_facture';

export interface Facture {
    ID: string;
    user_ID: string;
    done: string;
    lignes: LigneFacture[];
}
