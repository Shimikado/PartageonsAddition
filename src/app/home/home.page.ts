import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../shared/models/user';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthentificationService} from '../shared/services/authentification.service';
import {ToastController} from '@ionic/angular';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    user = {} as User;

    constructor(private afAuth: AngularFireAuth,
                private router: Router,
                private authService: AuthentificationService,
                public toastController: ToastController) {
    }


    async login(user: User) {
        let messageToast = '';
        try {
            const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
                .then(sucess => {
                    user.name = sucess.user.displayName;
                    user.uid = sucess.user.uid;
                    user.password = null;
                    this.authService.setAuthUser(user);
                    messageToast = 'Bonjour ' + user.name;
                    this.router.navigateByUrl('/dashboard');
                })
                .catch(error => {
                    messageToast = 'Email ou Mot de passe invalide';
                    }

                );
            const toastEmail = await this.toastController.create({
                message: messageToast,
                duration: 2000,
                position: 'top'
            });
            toastEmail.present();
        }
        catch (e) {
            console.error(e);
        }
    }

    async generatePassword(user: User) {
        let messageToast = '';
        try {

            const result = await this.afAuth.auth.sendPasswordResetEmail(user.email)
                .then(data => {
                    messageToast = 'Email de génération du nouveau mot de passe envoyé à: ' + user.email;
                })
                .catch(error => {
                    messageToast = 'merci de saisir une adresse Email valide';
                });
            const toastEmail = await this.toastController.create({
                message: messageToast,
                duration: 2000,
                position: 'top'
            });
            toastEmail.present();

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
