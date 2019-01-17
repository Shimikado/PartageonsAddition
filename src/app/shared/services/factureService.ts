import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Facture} from '../models/facture';

@Injectable()
export class FactureService {

    constructor(private firestore: AngularFirestore) {
    }

    // userId = 'aze2e31za3e1'
    getFactures(userId: string): Observable<any[]> {
        return this.firestore.collection(`factures`, ref => ref.where('user_ID', '==', userId)).valueChanges();
    }

    addFacture(facture: Facture): Observable<any> {
        return Observable.create(this.firestore.collection(`factures`)
            .add(facture));
    }
}