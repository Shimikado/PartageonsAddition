import {Component, OnInit} from '@angular/core';

import {ModalController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../shared/models/product';
import {BillService} from '../shared/services/bill.service';
import {Bill} from '../shared/models/bill';
import {ModalItemBillPage} from './modal-item-bill/modal-item-bill.page';
import {AuthentificationService} from '../shared/services/authentification.service';
import {UserInBase} from '../shared/models/userInBase';
import {AlertController} from '@ionic/angular';


@Component({
    selector: 'app-validate-bill',
    templateUrl: './validate-bill.page.html',
    styleUrls: ['./validate-bill.page.scss'],
})
export class ValidateBillPage {

    public listItem: Product[];
    private inputText: string;
    public sum: number;
    public user: UserInBase;

    constructor(public modalController: ModalController,
                private router: Router,
                private billService: BillService,
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
                    this.user = token;
                }
            }
        );
    }

    /**
     * Permet d'interpreter un texte en bill
     */
    private billParser() {
        this.listItem = [];
        const currentList = this.inputText.match(/[0-9]+[a-zA-Z ]+[0-9 ]+[\., ]*[0-9 ]*€/g);
        currentList.forEach(
            element => {
                const prixAvecSymbole = element.match(/[0-9 ]+[\., ]*[0-9 ]*€/g)[0];
                const prix = prixAvecSymbole.substr(0, prixAvecSymbole.length - 1);
                const label = element.match(/[a-zA-Z ]+/)[0];
                const quantity = element.match(/[0-9]+/)[0];
                const devise = element.match(/€/)[0];
                const product: Product = {
                    label: label.trim(),
                    prix: +prix.trim(),
                    devise: devise.trim(),
                    quantity: parseInt(quantity.trim(), 10),
                    uids: [],
                };
                this.listItem.push(product);
            }
        );
        this.calculateTotalAmount();
    }

    /**
     * Enregistre une bill et passe a l'etape suivante
     */
    public validate() {
        // On doit save la bill pour la rendre accessible à tous et envoyer l'id dans la page suivante
        const products = this.listItem;
        const bill: Bill = new class implements Bill {
            ID: string;
            created_date: Date;
            done: boolean;
            products: Product[];
            users: UserInBase[];
        };
        bill.done = false;
        bill.products = products;
        bill.users = [this.user];
        bill.created_date = new Date();
        bill.ID = this.billService.generateId();
        this.billService.addBill(bill).then(() => {
            this.router.navigateByUrl('list?id=' + bill.ID.substring(0, 4));
        });
    }

    /**
     * Ouvre une modal pour ajouter un element
     */
    async openModalAdd() {
        const modal = await this.modalController.create({
            component: ModalItemBillPage,
            componentProps: {action: 'Créer'},
            cssClass: 'wideModal'
        });

        modal.onDidDismiss()
            .then((data) => {
                if (data.data) {
                    const produit: Product = data.data;
                    this.listItem.push(produit);
                    this.calculateTotalAmount();
                }

            });
        return await modal.present();
    }

    /**
     * Ouvre une modal pour editer un element
     * @param i
     */
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
                if (data.data) {
                    const produit: Product = data.data;
                    this.listItem[i].prix = produit.prix;
                    this.listItem[i].quantity = produit.quantity;
                    this.listItem[i].label = produit.label;
                    this.calculateTotalAmount();
                }
            });
        return await modal.present();
    }

    /**
     * Ouvre une modal pour verifier la suppression d'un element
     * @param i
     */
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
                        this.calculateTotalAmount();
                    }
                }
            ]
        });

        await alert.present();

    }

    /**
     * Affiche ou non le bouton en parametre
     * @param i
     */
    public diplayActionButtons(i) {
        const name = 'actionButtons-' + i;
        if (document.getElementById(name).style.visibility === 'hidden') {
            document.getElementById(name).style.visibility = 'visible';
        } else {
            document.getElementById(name).style.visibility = 'hidden';
        }

    }

    /**
     * Calcule de montant total
     */
    public calculateTotalAmount() {
        let amount = 0;
        for (let i = 0; i < this.listItem.length; i++) {
            amount += this.listItem[i].prix * this.listItem[i].quantity;
        }
        this.sum = amount;
    }


}
