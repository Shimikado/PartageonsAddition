import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {ListPage} from './list.page';
import {SharedModule} from '../shared/shared.module';
import { UserJoinPage } from './user-join/user-join.page';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: ListPage
            }
        ])
    ],
    declarations: [ListPage, UserJoinPage],
    entryComponents: [UserJoinPage]
})
export class ListPageModule {
}
