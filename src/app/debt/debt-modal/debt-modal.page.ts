import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Dette} from '../../shared/models/dette';


@Component({
    selector: 'app-debt-modal',
    templateUrl: './debt-modal.page.html',
    styleUrls: ['./debt-modal.page.scss'],
})
export class DebtModalPage implements OnInit {
    dette = {} as Dette;

    constructor(public modalController: ModalController) {
    }

    ngOnInit() {
    }


    public close() {
        this.modalController.dismiss();
    }

    public doRefund() {
        this.modalController.dismiss(this.dette);

    }

}
