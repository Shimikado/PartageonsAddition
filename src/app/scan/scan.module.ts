import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ScanPage} from './scan.page';
import {NgProgressModule} from '@ngx-progressbar/core';
import {Camera} from '@ionic-native/camera/ngx';

const routes: Routes = [
    {
        path: '',
        component: ScanPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NgProgressModule,
        RouterModule.forChild(routes),
    ],
    declarations: [ScanPage],
    providers: [Camera]
})

export class ScanPageModule {
}
