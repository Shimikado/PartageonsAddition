import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../shared/models/user';
import {AngularFireAuth} from '@angular/fire/auth';
import {ToastController} from '@ionic/angular';


@Component({
    selector: 'app-signin',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
    user = {} as User;
    confirmedPassword;

    constructor(private afAuth: AngularFireAuth,
                private router: Router,
                public toastController: ToastController) {
    }


    async register(user: User, confirmedPassword) {
        try {
            const toastLogin = await this.toastController.create({
                message: 'Enregistrement effectué, vous pouvez maintenzant vous authentifier.',
                duration: 2000,
                position: 'top'
            });
            const toastErreurPassword = await this.toastController.create({
                message: 'Merci de vérifier votre confirmation de password',
                duration: 2000,
                position: 'top',

            });

            if (confirmedPassword !== user.password) {
                toastErreurPassword.present();
            } else {
                const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(
                    (success) => {
                        success.user.updateProfile({
                            displayName: user.name,
                            photoURL: ""
                        }).catch(
                            (err) => {
                                console.log(err);
                            });
                        toastLogin.present();
                        this.router.navigate(['/home'])
                    }).catch(
                    (err) => {
                        console.log(err);
                    });

            }
        } catch (e) {
            console.error(e);
        }
    }
}
