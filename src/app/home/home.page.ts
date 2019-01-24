import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../shared/models/user';
import {AngularFireAuth} from '@angular/fire/auth';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    user = {} as User;

    constructor(private afAuth: AngularFireAuth,
                private router: Router) {
    }

    async login(user: User) {
        try {
            const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
            if (result) {
                this.router.navigateByUrl('/dashboard');
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    async register(user: User) {
        try {
            const result = await this.afAuth.auth.createUserWithEmailAndPassword(
                user.email,
                user.password
            );
            if (result) {

                this.router.navigateByUrl('/dashboard');
            }
        } catch (e) {
            console.error(e);
        }
    }
}
