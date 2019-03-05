import {Component, OnInit} from '@angular/core';
import {UserInBase} from '../shared/models/userInBase';
import {User} from '../shared/models/user';
import {Dette} from '../shared/models/dette';
import {DebtModalPage} from './debt-modal/debt-modal.page';
import {ModalController} from '@ionic/angular';
import {UserJoinPage} from '../list/user-join/user-join.page';
import {DetteService} from '../shared/services/detteService';

@Component({
    selector: 'app-debt',
    templateUrl: './debt.page.html',
    styleUrls: ['./debt.page.scss'],
})
export class DebtPage implements OnInit {
    user = {} as User;
    user2 = {} as User;
    dette = {} as Dette;

    constructor(public modalController: ModalController, public detteService: DetteService) {
        this.user.name = 'Benjamin';
        this.user2.name = 'Jeremie';
        this.dette.userWho = this.user;
        this.dette.userTo = this.user2;
        this.dette.amount = 35;
        this.dette.createdDate = new Date();
        this.dette.ID = 'D02';
        this.dette.refund = false;
        this.dette.users.push(this.user);
        this.dette.users.push(this.user2);
        this.detteService.addDette(this.dette);

        this.detteService.getDettesByUser(this.user).then(
            dettes => console.log(dettes)
        );
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
