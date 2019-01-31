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
