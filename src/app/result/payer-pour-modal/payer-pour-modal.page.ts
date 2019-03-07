import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';


@Component({
    selector: 'app-payer-pour-modal',
    templateUrl: './payer-pour-modal.page.html',
    styleUrls: ['./payer-pour-modal.page.scss'],
})
export class PayerPourModalPage implements OnInit {

    constructor(public modalController: ModalController) {
    }

    ngOnInit() {
    }

    public close() {
        this.modalController.dismiss();
    }


}
