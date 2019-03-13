import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User} from '../models/user';
import {Bill} from '../models/bill';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import {isNull} from 'util';

@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {

    private authUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    constructor(private firestore: AngularFirestore,
                private storage: Storage) {
    }

    getAuthUser() {
        this.storage.get('user').then((val) => {
            this.authUser.next(JSON.parse(val));
        });

        return this.authUser.asObservable();
    }

    setAuthUser(value) {
        this.storage.set('user', JSON.stringify(value));
        this.authUser.next(value);
    }

    getUser(ID: string): Observable<any> {
        return this.firestore.collection<any>(`users`, ref => ref.where('uid', '==', ID)).snapshotChanges().pipe(
            map(user => {
                return user;
            }),
        );
    }

}
