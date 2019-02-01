import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User} from '../models/user';
import {Facture} from '../models/facture';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {

    private authUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    constructor(private firestore: AngularFirestore) {
    }

    getAuthUser() {
        return this.authUser.asObservable();
    }

    setAuthUser(value) {
        this.authUser.next(value);
    }

    getUser(ID: string): Observable<any> {
        return this.firestore.collection<any>(`users`, ref => ref.where('uid', '==', ID)).snapshotChanges().pipe(
            map(user => {
                debugger;
                return user;
            }),
        );
    }

}
