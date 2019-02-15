import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {FactureService} from '../shared/services/factureService';
import {ToastController} from '@ionic/angular';
import {isNull} from 'util';
import {of} from 'rxjs';

@Component({
    selector: 'app-join',
    templateUrl: './join.page.html',
    styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {

    idBill: string;
    item_form: FormGroup;
    isValid = false;

    constructor(
        public formBuilder: FormBuilder,
        private router: Router,
        private factureService: FactureService,
        public toastController: ToastController) {
        this.item_form = this.formBuilder.group({
            idBill: new FormControl(this.idBill, Validators.required),
        });
    }

    ngOnInit() {
    }

    validate() {
       console.log('change');
    }

    joinBill() {
        if (this.item_form.valid) {
            const now = new Date();
            const f = this.factureService.getFacturesByShortId(this.idBill.toUpperCase(), now).subscribe(
                (facture) => {
                    if (facture) {
                        this.isValid = true;
                        this.router.navigateByUrl('list?id=' + this.idBill.toUpperCase());
                    }
                }, () => {
                    this.isValid = false;
                }
            );
        }
    }

}
