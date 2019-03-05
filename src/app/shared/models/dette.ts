import {Facture} from './facture';
import {User} from './user';

export interface Dette {
    ID: string;
    createdDate: Date;
    userWho: User;
    userTo: User;
    amount: number;
    refund: boolean;
    refundDate: Date;
    factures: Facture[];
    users: User[];
}
