import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
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
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
