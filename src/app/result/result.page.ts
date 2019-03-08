import {ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FactureService} from '../shared/services/factureService';
import {AuthentificationService} from '../shared/services/authentification.service';
import {Facture} from '../shared/models/facture';
import {ModalController, ToastController} from '@ionic/angular';
import {PayerPourModalPage} from './payer-pour-modal/payer-pour-modal.page';
import {DetteService} from '../shared/services/detteService';
import {Dette} from '../shared/models/dette';

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
                private cd: ChangeDetectorRef, public toastController: ToastController, public modalController: ModalController,
                private detteService: DetteService) {
        this.authService.getAuthUser().subscribe(currentUser => {
            this.user = currentUser;
        });

        this.activeRoute.queryParams.subscribe(data => {
            if (data['id'].length === 4) {
                this.factureService.getFacturesByShortId(data['id'], new Date()).subscribe(
                    facture => {
                        this.facture = facture;
                        this.loadData(facture);
                    });

            } else {
                this.factureService.getFactures(data['id']).subscribe(
                    facture => {
                        this.facture = facture;
                        this.loadData(facture);
                    });
            }

        });
    }

    private loadData(facture: Facture) {
        facture.produits.forEach(produit => {
                produit.uids.forEach(uid => {
                    let user_found_index: number = this.users_prices.findIndex(u => u.uid === uid);
                    if (user_found_index < 0) {
                        this.users_prices.push({user: this.getUser(uid), uid: uid, name: this.getUserName(uid), price: 0, debts_user: []});
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
        this.detteService.getDettesByFactureID(this.facture.ID).then(querySnapshot => {
            const dettes = [];
            querySnapshot.forEach((det) => {
                const d = {...det.data() as Dette};
                dettes.push(d);
            });
            let result = this.users_prices;
            this.users_prices.forEach(
                userPrice => {
                    dettes.forEach(dette => {
                        if (userPrice.uid === dette.userTo.uid) {
                            result = result.filter(u => u.uid !== dette.userTo.uid);
                            const userIndex = result.findIndex(u => u.user.uid === dette.userWho.uid);
                            result[userIndex].debts_user.push({
                                user: this.getUser(dette.userTo.uid),
                                uid: dette.userTo.uid,
                                name: this.getUserName(dette.userTo.uid),
                                price: dette.amount,
                                debts_user: []
                            });
                        }
                    });
                }
            );
            this.users_prices = result;
        });
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

    public getSum(userPrice: any): number {
        let sum = userPrice.price;
        if (userPrice.debts_user && userPrice.debts_user.length > 0) {
            userPrice.debts_user.forEach(userElement => {
                if (userElement.amount) {
                    sum += userElement.amount;
                } else if (userElement.price) {
                    sum += userElement.price;
                }

            });
        }
        return sum;
    }

    async validate() {
        const toastUpdateOK = await this.toastController.create({
            message: 'Addition enregistrée',
            duration: 2000,
            position: 'top'
        });
        this.factureService.setFactureAsDone(this.facture.ID).then(() => {
                this.addDette();
                toastUpdateOK.present();
                this.router.navigateByUrl('historic');
            }
        );

    }

    async openModalPayerPour(userPrice: any) {
        const modal = await this.modalController.create({
            component: PayerPourModalPage,
            componentProps: {
                user: userPrice,
                users: this.users_prices,
            },
            cssClass: 'wideModal'
        });

        modal.onDidDismiss()
            .then((data) => {
                if (data.data) {
                    this.users_prices = data.data;
                }
            });
        return await modal.present();
    }

    private addDette() {
        this.users_prices.forEach(userPrice => {
            if (userPrice.debts_user && userPrice.debts_user.length > 0) {
                userPrice.debts_user.forEach(userDebt => {
                    const dette = {
                        amount: userDebt.price,
                        createdDate: new Date(),
                        userWho: userPrice.user,
                        userTo: userDebt.user,
                        refund: false,
                        factures: this.facture.ID,
                        users: [userPrice.user, userDebt.user],
                    } as Dette;
                    this.detteService.addDette(dette);
                });
            }
        });
    }
}
