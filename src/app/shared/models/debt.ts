import {User} from './user';

export interface Debt {
    ID: string;
    createdDate: Date;
    userWho: User;
    userTo: User;
    amount: number;
    refund: boolean;
    refundDate: Date;
    factures: string;
    users: User[];
}
