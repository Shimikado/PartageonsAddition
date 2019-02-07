import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {ModalItemBillPage} from './modal-item-bill.page';


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
        RouterModule.forChild(routes),
        ReactiveFormsModule,
    ],
    declarations: [ModalItemBillPage]
})
export class ModalItemBillPageModule {
}
