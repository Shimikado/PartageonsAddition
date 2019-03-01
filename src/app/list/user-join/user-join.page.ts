import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-user-join',
    templateUrl: './user-join.page.html',
    styleUrls: ['./user-join.page.scss'],
})
export class UserJoinPage implements OnInit {
    action: string;
    id: string;

    constructor(private modalCtrl: ModalController) {
    }

    ngOnInit() {
    }

    public close() {
        this.modalCtrl.dismiss();
    }

}
