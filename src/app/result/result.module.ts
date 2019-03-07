import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {IonicModule} from '@ionic/angular';

import {ResultPage} from './result.page';
import {PayerPourModalPage} from './payer-pour-modal/payer-pour-modal.page';



const routes: Routes = [
    {
        path: '',
        component: ResultPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ResultPage, PayerPourModalPage],
    entryComponents: [PayerPourModalPage]
})
export class ResultPageModule {
}
