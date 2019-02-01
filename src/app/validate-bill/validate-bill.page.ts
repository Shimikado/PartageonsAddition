import {Component, OnInit} from '@angular/core';

import {ModalController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Produit} from '../shared/models/produit';
import {FactureService} from '../shared/services/factureService';
import {Facture} from '../shared/models/facture';
import { ModalItemBillPage } from './modal-item-bill/modal-item-bill.page';
import {AuthentificationService} from '../shared/services/authentification.service';
import random from '@angular-devkit/schematics/src/rules/random';


@Component({
    selector: 'app-validate-bill',
    templateUrl: './validate-bill.page.html',
    styleUrls: ['./validate-bill.page.scss'],
})
export class ValidateBillPage implements OnInit {

    public listItem: Produit[];
    private inputText: string;
    public sum: number;
    public userId: string;

    constructor(public modalController: ModalController,
                private router: Router,
                private factureService: FactureService,
                private authService: AuthentificationService,
                private activeRoute: ActivatedRoute) {
        this.listItem = [];
        this.sum = 0;
        this.activeRoute.queryParams.subscribe(data => {
            this.inputText = data.inputText;
            this.billParser();
        });
        this.authService.getAuthUser().subscribe(
            token => {
                this.userId = token.uid;
                debugger;
            }
        );
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

    public validate() {
        // On doit save la facture pour la rendre accessible à tous et envoyer l'id dans la page suivante
        const produits = this.listItem;
        const facture: Facture = new class implements Facture {
            ID: string;
            done: string;
            produits: Produit[];
            users_ID: string[];
        };
        facture.done = 'false';
        facture.produits = produits;
        facture.users_ID = [this.userId];
        facture.short_ID = '' + Math.random() * 1000;
        facture.created_date = new Date();
        const now = new Date();
        // TODO remplacer user ID par un random en 3 chiffres
        facture.ID = facture.users_ID[0] + now.getFullYear().toString()[2]
            + now.getFullYear().toString()[3] + now.getMonth() + now.getDay() + now.getHours();
        this.factureService.addFacture(facture);
        this.router.navigateByUrl('list?id=' + facture.short_ID);
    }

    async openModalAdd() {
        const modal = await this.modalController.create({
            component: ModalItemBillPage,
            componentProps: {value: 123}
        });
        modal.onDidDismiss()
            .then((data) => {
                const produit: Produit = data.data;
                console.log(produit);
                this.listItem.push(produit);
            });
        return await modal.present();
    }

}
