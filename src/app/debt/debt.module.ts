import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

import {IonicModule} from '@ionic/angular';

import {DebtPage} from './debt.page';

const routes: Routes = [
    {
        path: '',
        component: DebtPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [DebtPage]
})
export class DebtPageModule {
}
