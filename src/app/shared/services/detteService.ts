import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Dette} from '../models/dette';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/observable/from';
import 'rxjs-compat/add/observable/fromPromise';
import 'rxjs-compat/add/observable/defer';
import {AngularFireDatabaseModule, snapshotChanges} from '@angular/fire/database';
import {Collection} from '@angular-devkit/schematics';
import {Facture} from '../models/facture';
import {User} from '../models/user';
import {_document} from '@angular/platform-browser/src/browser';

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
            .where('users', 'array-contains', {name : 'Jeremie'})
            .where('refund', '==', refund);

        return query.get();
    }

    doRefund(dette: Dette) {

        const detteQuery = this.firestore.collection('dette').doc(dette.ID);

        return detteQuery.update({
            refund: true
        } );
    }

}
