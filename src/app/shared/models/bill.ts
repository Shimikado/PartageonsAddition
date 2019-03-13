import {Product} from './product';
import {UserInBase} from './userInBase';

export interface Bill {
    ID: string;
    created_date: Date;
    users: UserInBase[];
    done: boolean;
    products: Product[];
}
