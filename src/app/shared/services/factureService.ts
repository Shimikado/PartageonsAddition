import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Facture} from '../models/facture';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/observable/from';
import 'rxjs-compat/add/observable/fromPromise';
import 'rxjs-compat/add/observable/defer';
import {Dette} from '../models/dette';

@Injectable()
export class FactureService {

    constructor(private firestore: AngularFirestore) {
    }

    addFacture(facture: Facture): Promise<any> {
        const data = JSON.parse(JSON.stringify(facture));

        return this.firestore.doc<Facture>('facture/' + facture.ID).set(data);

    }

    getFactures(ID: string): Observable<Facture> {
        return this.firestore.doc<Facture>('facture/' + ID).snapshotChanges().pipe(
            map(factureID => {
                const facture = factureID;
                if (facture) {
                    const data = facture.payload.data() as Facture;
                    return {...data};
                }
                return null;
            }),
        );
    }

    getAllFactures(user: any) {
        const factures = this.firestore.collection('facture');
        const query = factures.ref
            .where('users', 'array-contains', user);

        return query.get();
    }



    getFacturesByShortId(short_ID: string, date: Date): Observable<Facture> {
        return this.getFactures(this.getIdFromNow(short_ID));
    }

    private stringGen(len: number) {
        let text = '';

        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        for (let i = 0; i < len; i++) {
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        return text;
    }

    setFactureAsDone(ID: string) {

        const factureQuery = this.firestore.collection('facture').doc(ID);

        return factureQuery.update({
            done: true
        } );
    }

    public generateId(): string {
        const now = new Date();
        return this.stringGen(4) + this.getDateStringFormatId(now);
    }

    public getIdFromNow(shortId: string): string {
        const now = new Date();
        return this.getIdFromDate(shortId, now);
    }

    public getIdFromDate(shortId: string, date: Date): string {
        return shortId + this.getDateStringFormatId(date);
    }

    private getDateStringFormatId(date: Date): string {
        return date.getFullYear().toString()[2]
            + date.getFullYear().toString()[3] + date.getMonth() + date.getDay() + date.getHours();
    }
}
