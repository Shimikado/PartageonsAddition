import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Facture} from '../models/facture';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable()
export class FactureService {

    constructor(private firestore: AngularFirestore) {
    }

    addFacture(facture: Facture): Observable<Facture> {
        const data = JSON.parse(JSON.stringify(facture));
        return Observable.create(this.firestore.collection(`factures`)
            .add(data));
    }

    // userId = 'aze2e31za3e1'
    getFactures(ID: string): Observable<Facture> {
        return this.firestore.collection<Facture>(`factures`, ref => ref.where('ID', '==', ID)).snapshotChanges().pipe(
            map(factures => {
                const facture = factures[0];
                if (facture) {
                    const data = facture.payload.doc.data() as Facture;
                    return {...data};
                }
                return null;
            }),
        );
    }
}
