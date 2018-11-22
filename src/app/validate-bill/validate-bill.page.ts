import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import {AddPage} from './add/add.page';


@Component({
  selector: 'app-validate-bill',
  templateUrl: './validate-bill.page.html',
  styleUrls: ['./validate-bill.page.scss'],
})
export class ValidateBillPage implements OnInit {

   constructor(public modalController: ModalController) {}

    async openModalAdd() {
        const modal = await this.modalController.create({
            component: AddPage,
            componentProps: { value: 123 }
        });
        return await modal.present();
    }
  ngOnInit() {
  }

}
