import {Injectable} from '@angular/core';
import {Debt} from '../models/debt';
import {AngularFirestore} from '@angular/fire/firestore';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/observable/from';
import 'rxjs-compat/add/observable/fromPromise';
import 'rxjs-compat/add/observable/defer';
import {User} from '../models/user';

@Injectable()
export class DebtService {

    constructor(private firestore: AngularFirestore) {
    }

    addDebt(debt: Debt): Promise<any> {
        const data = JSON.parse(JSON.stringify(debt));
        return this.firestore.collection<Debt>('debt').add(data);

    }

    getDebtsByUser(user: User, refund: boolean) {
        const debts = this.firestore.collection('debt');
        const query = debts.ref
            .where('users', 'array-contains', user)
            .where('refund', '==', refund);

        return query.get();
    }

    getDebtsByFactureID(factureId: string) {
        const debts = this.firestore.collection('debt');
        const query = debts.ref
            .where('factures', '==', factureId);

        return query.get();
    }

    doRefund(dette: Debt) {
        const debtQuery = this.firestore.collection('debt').doc(dette.ID);

        return debtQuery.update({
            refund: true
        });
    }

}
