import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Dette} from '../models/dette';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/observable/from';
import 'rxjs-compat/add/observable/fromPromise';
import 'rxjs-compat/add/observable/defer';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {Collection} from '@angular-devkit/schematics';
import {Facture} from '../models/facture';
import {User} from '../models/user';

@Injectable()
export class DetteService {

    constructor(private firestore: AngularFirestore) {
    }

    addDette(dette: Dette): Promise<any> {
        const data = JSON.parse(JSON.stringify(dette));

        return this.firestore.collection<Dette>('dette').add(data);

    }

    getDettes() {
        return this.firestore.collection(`dette`).snapshotChanges().pipe(
            map(result => {
                const res = [];
                result.forEach(
                    detteData => {
                        const dette = {...detteData.payload.doc.data() as Dette};
                        res.push(dette);
                    }
                );
                return res;
            }),
        );
    }

    getDettesByUser(user: User) {
        const dettes = this.firestore.collection('dette');
        const query = dettes.ref.where('users', 'array-contains', {name : 'Jeremie'});

        return query.get().then((querySnapshot) => {
            const res = [];
            querySnapshot.forEach((dette) => {
                    const d = {...dette.data() as Dette};
                    console.log(d);
                    res.push(d);
                });
            });

    }

}
