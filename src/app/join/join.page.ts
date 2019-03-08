import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FactureService} from '../shared/services/factureService';
import {ToastController} from '@ionic/angular';

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
        public toastController: ToastController,
        private router: Router,
        private factureService: FactureService) {
        this.item_form = this.formBuilder.group({
            idBill: new FormControl(this.idBill, Validators.required),
        });
    }

    /**
     * Permet de rejoindre une facture
     */
    async joinBill() {
        const toastErreur = await this.toastController.create({
            message: 'Addition inconnue ou déjà close',
            duration: 2000,
            position: 'top'
        });
        if (this.item_form && this.item_form.valid) {
            const now = new Date();
            this.isValid = false;
            const f = this.factureService.getFacturesByShortId(this.idBill.toUpperCase(), now).subscribe(
                (facture) => {
                    // Join possible si l'addition n'est pas déjà terminée
                    if (facture && facture.done === false) {
                        this.isValid = true;
                        this.router.navigateByUrl('list?id=' + this.idBill.toUpperCase());
                    } else {
                        this.isValid = false;
                        toastErreur.present();
                    }
                }
            );

        }


    }

}
