import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalItemBillPage } from './modal-item-bill.page';

const routes: Routes = [
  {
    path: '',
    component: ModalItemBillPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalItemBillPage]
})
export class ModalItemBillPageModule {}
