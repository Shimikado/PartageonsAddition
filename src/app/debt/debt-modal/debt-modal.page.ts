import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Debt} from '../../shared/models/debt';
import {Router} from '@angular/router';


@Component({
    selector: 'app-debt-modal',
    templateUrl: './debt-modal.page.html',
    styleUrls: ['./debt-modal.page.scss'],
})
export class DebtModalPage implements OnInit {
    debt = {} as Debt;

    constructor(public modalController: ModalController, private router: Router) {
    }

    ngOnInit() {
    }


    public close() {
        this.modalController.dismiss();
    }

    public doRefund() {
        this.modalController.dismiss(this.debt);

    }

    public goToBill(bill: string) {
        this.modalController.dismiss();
        this.router.navigateByUrl('result?id=' + bill);
    }

}
