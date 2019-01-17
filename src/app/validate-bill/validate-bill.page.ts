import {Component, OnInit} from '@angular/core';

import {ModalController} from '@ionic/angular';
import {AddPage} from './add/add.page';
import {ActivatedRoute} from '@angular/router';
import {Produit} from '../shared/models/produit';


@Component({
    selector: 'app-validate-bill',
    templateUrl: './validate-bill.page.html',
    styleUrls: ['./validate-bill.page.scss'],
})
export class ValidateBillPage implements OnInit {

    public listItem: Produit[];
    private inputText: string;
    public sum: number;

    constructor(public modalController: ModalController,
                private activeRoute: ActivatedRoute) {
        this.listItem = [];
        this.sum = 0;
        this.activeRoute.queryParams.subscribe(data => {
            this.inputText = data.inputText;
            this.billParser();
        });
    }

    ngOnInit() {
    }

    private billParser() {
        this.listItem = [];
        this.sum = 0;
        const currentList = this.inputText.match(/[0-9]+[a-zA-Z ]+[0-9 ]+[\., ]*[0-9 ]*€/g);
        currentList.forEach(
            element => {
                const prixAvecSymbole = element.match(/[0-9 ]+[\., ]*[0-9 ]*€/g)[0];
                const prix = prixAvecSymbole.substr(0, prixAvecSymbole.length - 1);
                const label = element.match(/[a-zA-Z ]+/)[0];
                const quantity = element.match(/[0-9]+/)[0];
                const devise = element.match(/€/)[0];
                const product: Produit = {
                    label: label.trim(),
                    prix: +prix.trim(),
                    devise: devise.trim(),
                    quantity: quantity.trim(),
                    nom: 'Jean mich mich'.trim(),
                };
                this.sum += product.prix;
                this.listItem.push(product);
            }
        );
    }

    async openModalAdd() {
        const modal = await this.modalController.create({
            component: AddPage,
            componentProps: {value: 123}
        });
        modal.onDidDismiss()
            .then((data) => {
                const produit: Produit = data.data;
                this.listItem.push(produit);
            });
        return await modal.present();
    }

}
