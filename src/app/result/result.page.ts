import {ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FactureService} from '../shared/services/factureService';
import {AuthentificationService} from '../shared/services/authentification.service';
import {Facture} from '../shared/models/facture';
import {ToastController} from '@ionic/angular';
import {PayerPourModalPage} from './payer-pour-modal/payer-pour-modal.page';
import {ModalController} from '@ionic/angular';
import {Dette} from '../shared/models/dette';
import {DebtModalPage} from '../debt/debt-modal/debt-modal.page';

@Component({
    selector: 'app-result',
    templateUrl: './result.page.html',
    styleUrls: ['./result.page.scss'],
})
export class ResultPage {
    public user: any;
    public userShow: any;
    public facture: any;
    public montantFacture = 0;
    public users_prices = [];


    constructor(private activeRoute: ActivatedRoute, protected factureService: FactureService,
                private router: Router, private authService: AuthentificationService,
                private cd: ChangeDetectorRef, public toastController: ToastController, public modalController: ModalController,)  {


        this.activeRoute.queryParams.subscribe(data => {
            if (data['id'].length === 4) {
                this.factureService.getFacturesByShortId(data['id'], new Date()).subscribe(
                    facture => {
                        this.facture = facture;
                        this.loadData(facture);
                        console.log(this.users_prices);
                    });

            } else {
                this.factureService.getFactures(data['id']).subscribe(
                    facture => {
                        this.facture = facture;
                        this.loadData(facture);
                        console.log(this.users_prices);
                    });
            }

        });
    }

    private loadData(facture: Facture) {
        facture.produits.forEach(produit => {
                produit.uids.forEach(uid => {
                    let user_found_index: number = this.users_prices.findIndex(u => u.uid === uid);
                    if (user_found_index < 0) {
                        this.users_prices.push({user: this.getUser(uid), uid: uid, name: this.getUserName(uid), price: 0});
                        user_found_index = this.users_prices.length - 1;
                    }

                    this.users_prices[user_found_index].price += produit.prix;
                    this.montantFacture += produit.prix;
                    if (!this.users_prices[user_found_index].devise) {
                        this.users_prices[user_found_index].devise = produit.devise;
                    }
                });
            }
        );
    }

    public getUserName(uid: string): string {
        return this.facture.users.find(u => u.uid === uid).name;
    }

    public getUser(uid: string): string {
        return this.facture.users.find(u => u.uid === uid);
    }

    public goToUpdate() {
        this.router.navigateByUrl('list?id=' + this.facture.ID);
    }

    async validate() {
        const toastUpdateOK = await this.toastController.create({
            message: 'Addition enregistrée',
            duration: 2000,
            position: 'top'
        });
        const toastUpdateKO = await this.toastController.create({
            message: 'Problème durant la mise à jour de l addition',
            duration: 2000,
            position: 'top'
        });
        this.factureService.setFactureAsDone(this.facture.ID).then(() => {
            toastUpdateOK.present();
            this.router.navigateByUrl('historic');
            }
        );

    }

    async openModalPayerPour() {
        const modal = await this.modalController.create({
            component: PayerPourModalPage,
            componentProps: {
            },
            cssClass: 'wideModal'
        });

        modal.onDidDismiss()
            .then((data) => {
                console.log(data);
            });
        return await modal.present();
    }

    public addDette() {

    }
}
