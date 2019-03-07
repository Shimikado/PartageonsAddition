import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {DebtModalPage} from './debt-modal/debt-modal.page';

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
    declarations: [DebtPage, DebtModalPage],
    entryComponents: [DebtModalPage]
})
export class DebtPageModule {
}
