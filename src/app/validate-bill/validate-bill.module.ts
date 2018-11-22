import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ValidateBillPage } from './validate-bill.page';
import {AddPage} from './add/add.page';

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
        RouterModule.forChild(routes)
    ],
    declarations: [ValidateBillPage, AddPage],
    entryComponents: [AddPage]
})
export class ValidateBillPageModule {}