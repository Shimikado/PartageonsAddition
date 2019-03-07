import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PayerPourModalPage } from './payer-pour-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PayerPourModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PayerPourModalPage]
})
export class PayerPourModalPageModule {}
