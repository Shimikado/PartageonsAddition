import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ValidateBillPage } from './validate-bill.page';
import { ModalItemBillPage } from './modal-item-bill/modal-item-bill.page';


const routes: Routes = [
    {
        path: '',
        component: ValidateBillPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    declarations: [ValidateBillPage, ModalItemBillPage],
    entryComponents: [ModalItemBillPage]
})
export class ValidateBillPageModule {}