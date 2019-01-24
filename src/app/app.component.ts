import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase/app';
import {AuthentificationService} from './shared/services/authentification.service';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']

})
export class AppComponent {
    public appPages = [
        {
            title: 'Scanner une addition',
            url: '/scan',
            icon: 'camera'
        }, {
            title: 'Rejoindre une addition',
            url: '/join',
            icon: 'bookmark'
        }, {
            title: 'Mes additions',
            url: '/historic',
            icon: 'list-box'
        }, {
            title: 'Soldes entre membres',
            url: '/debt',
            icon: 'swap'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authService: AuthentificationService,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
        // Config for firebase
        const configFirebase = {
            apiKey: 'AIzaSyCNK9vo3mI3mxN_AqMoZmsxt5wjPIz3zro',
            authDomain: 'partageons-l-addition.firebaseapp.com',
            databaseURL: 'https://partageons-l-addition.firebaseio.com',
            projectId: 'partageons-l-addition',
            storageBucket: 'partageons-l-addition.appspot.com',
            messagingSenderId: '389644409346'
        };
        firebase.initializeApp(configFirebase);
    }
}
