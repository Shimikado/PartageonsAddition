import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../shared/models/user';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthentificationService} from '../shared/services/authentification.service';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    user = {} as User;

    constructor(private afAuth: AngularFireAuth,
                private router: Router,
                private authService: AuthentificationService) {
    }

    async login(user: User) {
        try {
            const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
            if (result) {
                debugger;
                user.name = result.user.displayName;
                user.uid = result.user.uid;
                user.password = null;
                this.authService.setAuthUser(user);
                this.router.navigateByUrl('/dashboard');
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    async register(user: User) {
        try {
            this.router.navigateByUrl('/register');
        } catch (e) {
            console.error(e);
        }
    }
}
