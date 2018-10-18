import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ValidateBillPage } from './validate-bill.page';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './add/add.page';

const routes: Routes = [
  {
    path: '',
    component: ValidateBillPage
  }
];

@Component({
    selector: 'validate-bill',
    templateUrl: 'validate-bill.page.html',
    styleUrls: ['./validate-bill.page.css']
})

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ValidateBillPage]
})
export class ValidateBillPageModule {

    constructor(public modalController: ModalController) {}

    async openModalAdd() {
        const modal = await this.modalController.create({
            component: ModalPage,
            componentProps: { value: 123 }
        });
        return await modal.present();
    }


}
