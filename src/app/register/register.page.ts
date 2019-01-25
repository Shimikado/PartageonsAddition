import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../shared/models/user';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-signin',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
    user = {} as User;

    constructor(private afAuth: AngularFireAuth,
                private router: Router) {
    }

    async register(user: User) {

        try {
            const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

            if (result) {
                this.router.navigateByUrl('/dashboard');
            }
        } catch (e) {
            console.error(e);
        }
    }
}
