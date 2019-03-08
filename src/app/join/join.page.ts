import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FactureService} from '../shared/services/factureService';

@Component({
    selector: 'app-join',
    templateUrl: './join.page.html',
    styleUrls: ['./join.page.scss'],
})
export class JoinPage {

    idBill: string;
    item_form: FormGroup;
    isValid = false;

    constructor(
        public formBuilder: FormBuilder,
        private router: Router,
        private factureService: FactureService) {
        this.item_form = this.formBuilder.group({
            idBill: new FormControl(this.idBill, Validators.required),
        });
    }

    /**
     * Permet de rejoindre une facture
     */
    joinBill() {
        if (this.item_form && this.item_form.valid) {
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
