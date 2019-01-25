import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {

    private authUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    constructor() {
    }

    getAuthUser() {
        return this.authUser.asObservable();
    }

    setAuthUser(value) {
        this.authUser.next(value);
    }

}
