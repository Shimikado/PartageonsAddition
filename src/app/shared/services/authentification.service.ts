import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {

    private authUser: Subject<User> = new Subject<User>();

    constructor() {
    }

    getAuthUser() {
        return this.authUser.asObservable();
    }

    setAuthUser(value) {
        this.authUser.next(value);
    }

}
