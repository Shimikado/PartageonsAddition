import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Facture} from '../models/facture';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/observable/from';
import 'rxjs-compat/add/observable/fromPromise';
import 'rxjs-compat/add/observable/defer';

@Injectable()
export class FactureService {

    constructor(private firestore: AngularFirestore) {
    }

    addFacture(facture: Facture): Promise<any> {
        const data = JSON.parse(JSON.stringify(facture));
        const queries = this.firestore.collection(`factures/facture/${facture.ID}`).ref.get();
        return queries.then((docs) => {
            docs.forEach(
                doc => {
                    doc.ref.delete();
                }
            );
            return this.firestore.collection(`factures/facture/${facture.ID}`)
                .add(data);
        });
    }

    getFactures(ID: string): Observable<Facture> {
        return this.firestore.collection<Facture>(`factures/facture/${ID}`).snapshotChanges().pipe(
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
