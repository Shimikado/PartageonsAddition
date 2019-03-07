import {Injectable} from '@angular/core';
import {Dette} from '../models/dette';
import {AngularFirestore} from '@angular/fire/firestore';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/observable/from';
import 'rxjs-compat/add/observable/fromPromise';
import 'rxjs-compat/add/observable/defer';
import {User} from '../models/user';

@Injectable()
export class DetteService {

    constructor(private firestore: AngularFirestore) {
    }

    addDette(dette: Dette): Promise<any> {
        const data = JSON.parse(JSON.stringify(dette));
        return this.firestore.collection<Dette>('dette').add(data);

    }

    getDettesByUser(user: User, refund: boolean) {
        const dettes = this.firestore.collection('dette');
        const query = dettes.ref
            .where('users', 'array-contains', user)
            .where('refund', '==', refund);

        return query.get();
    }

    getDettesByFactureID(factureId: string) {
        const dettes = this.firestore.collection('dette');
        const query = dettes.ref
            .where('factures', '==', factureId);

        return query.get();
    }

    doRefund(dette: Dette) {

        const detteQuery = this.firestore.collection('dette').doc(dette.ID);

        return detteQuery.update({
            refund: true
        });
    }

}
