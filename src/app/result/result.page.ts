import {ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BillService} from '../shared/services/bill.service';
import {AuthentificationService} from '../shared/services/authentification.service';
import {Bill} from '../shared/models/bill';
import {ModalController, ToastController} from '@ionic/angular';
import {PayerPourModalPage} from './payer-pour-modal/payer-pour-modal.page';
import {DebtService} from '../shared/services/debt.service';
import {Debt} from '../shared/models/debt';

@Component({
    selector: 'app-result',
    templateUrl: './result.page.html',
    styleUrls: ['./result.page.scss'],
})
export class ResultPage {
    public user: any;
    public userShow: any;
    public bill: any;
    public billAmount = 0;
    public users_prices = [];


    constructor(private activeRoute: ActivatedRoute, protected billService: BillService,
                private router: Router, private authService: AuthentificationService,
                private cd: ChangeDetectorRef, public toastController: ToastController, public modalController: ModalController,
                private debtService: DebtService) {
        this.authService.getAuthUser().subscribe(currentUser => {
            this.user = currentUser;
        });

        this.activeRoute.queryParams.subscribe(data => {
            if (data['id'].length === 4) {
                this.billService.getBillsByShortId(data['id'], new Date()).subscribe(
                    bill => {
                        this.bill = bill;
                        this.loadData(bill);
                    });

            } else {
                this.billService.getBills(data['id']).subscribe(
                    bill => {
                        this.bill = bill;
                        this.loadData(bill);
                    });
            }

        });
    }

    private loadData(bill: Bill) {
        this.billAmount = 0;
        this.users_prices.forEach(userPrice => {
            userPrice.price = 0;
        });
        bill.products.forEach(produit => {
                produit.uids.forEach(uid => {
                    let user_found_index: number = this.users_prices.findIndex(u => u.uid === uid);
                    if (user_found_index < 0) {
                        this.users_prices.push({user: this.getUser(uid), uid: uid, name: this.getUserName(uid), price: 0, debts_user: []});
                        user_found_index = this.users_prices.length - 1;
                    }

                    this.users_prices[user_found_index].price += produit.prix;
                    this.billAmount += produit.prix;
                    if (!this.users_prices[user_found_index].devise) {
                        this.users_prices[user_found_index].devise = produit.devise;
                    }
                });
            }
        );
        this.debtService.getDebtsByFactureID(this.bill.ID).then(querySnapshot => {
            const dettes = [];
            querySnapshot.forEach((det) => {
                const d = {...det.data() as Debt};
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
        this.cd.markForCheck();
    }

    public getUserName(uid: string): string {
        return this.bill.users.find(u => u.uid === uid).name;
    }

    public getUser(uid: string): string {
        return this.bill.users.find(u => u.uid === uid);
    }

    public goToUpdate() {
        this.router.navigateByUrl('list?id=' + this.bill.ID);
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
        this.billService.setBillAsDone(this.bill.ID).then(() => {
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
                        userWho: userDebt.user,
                        userTo: userPrice.user,
                        refund: false,
                        factures: this.bill.ID,
                        users: [userPrice.user, userDebt.user],
                    } as Debt;
                    this.debtService.addDebt(dette);
                });
            }
        });
    }

    public removeDebt(userPrice, userDebt) {
        if (this.bill.done) {
            return;
        }
        const indexUser = this.users_prices.findIndex(u => u.uid === userPrice.uid);
        if (indexUser >= 0) {
            this.users_prices[indexUser].debts_user = this.users_prices[indexUser].debts_user.filter(u => u.uid !== userDebt.uid);
            this.users_prices.push({
                user: this.getUser(userDebt.uid),
                uid: userDebt.uid,
                name: this.getUserName(userDebt.uid),
                price: userDebt.price,
                debts_user: []
            });
            this.cd.markForCheck();
        }
    }
}
