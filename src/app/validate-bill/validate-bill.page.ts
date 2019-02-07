import {Component, OnInit} from '@angular/core';

import {ModalController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Produit} from '../shared/models/produit';
import {FactureService} from '../shared/services/factureService';
import {Facture} from '../shared/models/facture';
import {ModalItemBillPage} from './modal-item-bill/modal-item-bill.page';
import {AuthentificationService} from '../shared/services/authentification.service';
import {AlertController} from '@ionic/angular';
import {isNull, isUndefined} from 'util';


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
                private activeRoute: ActivatedRoute,
                public alertController: AlertController) {
        this.listItem = [];
        this.sum = 0;
        this.activeRoute.queryParams.subscribe(data => {
            this.inputText = data.inputText;
            this.billParser();
        });
        this.authService.getAuthUser().subscribe(
            token => {
                if (token) {
                    this.userId = token.uid;
                }
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
                    quantity: +quantity.trim(),
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
            created_date: Date;
            done: string;
            produits: Produit[];
            short_ID: string;
            users_ID: string[];
        };
        facture.done = 'false';
        facture.produits = produits;
        facture.users_ID = [this.userId];
        facture.created_date = new Date();
        facture.ID = this.factureService.generateId();
        this.factureService.addFacture(facture);
        this.router.navigateByUrl('list?id=' + facture.ID.substring(0, 4));
    }

    async openModalAdd() {
        const modal = await this.modalController.create({
            component: ModalItemBillPage,
            componentProps: {action: 'Créer'},
            cssClass: 'wideModal'
        });

        modal.onDidDismiss()
            .then((data) => {
                if (!isUndefined(data.data)) {
                    const produit: Produit = data.data;
                    this.listItem.push(produit);
                }

            });
        return await modal.present();
    }

    async openModalUpdate(i) {
        const modal = await this.modalController.create({
            component: ModalItemBillPage,
            componentProps: {
                action: 'Modifier',
                produit: this.listItem[i],
            },
            cssClass: 'wideModal'
        });
        modal.onDidDismiss()
            .then((data) => {
                if (!isUndefined(data.data)) {
                    const produit: Produit = data.data;
                    this.listItem[i].prix = produit.prix;
                    this.listItem[i].quantity = produit.quantity;
                    this.listItem[i].nom = produit.nom;
                    this.calculateTotalAmount();
                }
            });
        return await modal.present();
    }

    async presentAlertConfirm(i) {
        const alert = await this.alertController.create({
            header: 'Suppression',
            message: 'Souhaitez vous supprimer cet élément ?',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'annuler',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Supprimer',
                    handler: () => {
                        this.listItem.splice(i, 1);
                    }
                }
            ]
        });

        await alert.present();

    }

    public diplayActionButtons(i) {
        const name = 'actionButtons-' + i;
        if (document.getElementById(name).style.visibility === 'hidden') {
            document.getElementById(name).style.visibility = 'visible';
        } else {
            document.getElementById(name).style.visibility = 'hidden';
        }

    }

    public calculateTotalAmount() {
        let amount = 0;
        for (let i = 0; i < this.listItem.length; i++) {
            amount += this.listItem[i].prix;
        }
        this.sum = amount;
    }


}
