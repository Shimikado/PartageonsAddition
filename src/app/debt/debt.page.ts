import {Component, OnInit} from '@angular/core';
import {UserInBase} from '../shared/models/userInBase';
import {User} from '../shared/models/user';
import {DebtModalPage} from './debt-modal/debt-modal.page';
import {ModalController} from '@ionic/angular';
import {UserJoinPage} from '../list/user-join/user-join.page';


@Component({
    selector: 'app-debt',
    templateUrl: './debt.page.html',
    styleUrls: ['./debt.page.scss'],
})
export class DebtPage implements OnInit {
    user = {} as User;
    user2 = {} as User;

    constructor(public modalController: ModalController,) {
        this.user.name = 'Jeremie';
        this.user2.name = 'Benjamin';
    }

    ngOnInit() {
    }

    async openModalDebt() {
        const modal = await this.modalController.create({
            component: DebtModalPage,
            componentProps: {
                userQui: this.user,
                userAQui: this.user2,
                montant: '33.5 €',
                additions: 'ADDITION A',
            },
            cssClass: 'wideModal'
        });
        return await modal.present();
    }

}
