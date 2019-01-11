import {Component, OnInit} from '@angular/core';

import {ModalController} from '@ionic/angular';
import {AddPage} from './add/add.page';


@Component({
    selector: 'app-validate-bill',
    templateUrl: './validate-bill.page.html',
    styleUrls: ['./validate-bill.page.scss'],
})
export class ValidateBillPage implements OnInit {

    public listItem: any[];

    constructor(public modalController: ModalController) {
        this.listItem = [{name: 'Matrimonio', quantity: 1, value: 1}];
    }

    async openModalAdd() {
        const modal = await this.modalController.create({
            component: AddPage,
            componentProps: {value: 123}
        });
        modal.onDidDismiss()
            .then((data) => {
                this.listItem.push(data);
            });
        return await modal.present();
    }

    ngOnInit() {
    }

}
