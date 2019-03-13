import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Bill} from '../models/bill';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/observable/from';
import 'rxjs-compat/add/observable/fromPromise';
import 'rxjs-compat/add/observable/defer';

@Injectable()
export class BillService {

    constructor(private firestore: AngularFirestore) {
    }

    addBill(bill: Bill): Promise<any> {
        const data = JSON.parse(JSON.stringify(bill));

        return this.firestore.doc<Bill>('bill/' + bill.ID).set(data);

    }

    getBills(ID: string): Observable<Bill> {
        return this.firestore.doc<Bill>('bill/' + ID).snapshotChanges().pipe(
            map(billId => {
                const bill = billId;
                if (bill) {
                    const data = bill.payload.data() as Bill;
                    return {...data};
                }
                return null;
            }),
        );
    }

    getAllBills(user: any) {
        const bills = this.firestore.collection('bill');
        const query = bills.ref
            .where('users', 'array-contains', user)
            .orderBy('created_date', 'desc');

        return query.get();
    }

    getBillsByShortId(short_ID: string, date: Date): Observable<Bill> {
        return this.getBills(this.getIdFromNow(short_ID));
    }

    private stringGen(len: number) {
        let text = '';

        const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

        for (let i = 0; i < len; i++) {
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        return text;
    }

    setBillAsDone(ID: string) {

        const billQuery = this.firestore.collection('bill').doc(ID);

        return billQuery.update({
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
