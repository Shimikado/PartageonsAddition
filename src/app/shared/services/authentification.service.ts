import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {

    private authToken: Subject<any> = new Subject<any>();

    constructor() {
    }

    getAuthToken() {
        return this.authToken.asObservable();
    }

    setAuthToken(value) {
        this.authToken.next(value);
    }
}
