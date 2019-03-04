import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/models/user';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-debt-modal',
    templateUrl: './debt-modal.page.html',
    styleUrls: ['./debt-modal.page.scss'],
})
export class DebtModalPage implements OnInit {
    userQui: {};
    userAQui: {};
    montant: string;
    additions: string;

    constructor(public modalController: ModalController) {
    }

    ngOnInit() {
    }


    public close() {
        this.modalController.dismiss();
    }
}
