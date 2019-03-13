import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BillService} from '../shared/services/bill.service';
import {Bill} from '../shared/models/bill';
import {AuthentificationService} from '../shared/services/authentification.service';
import {UserInBase} from '../shared/models/userInBase';
import {UserJoinPage} from './user-join/user-join.page';
import {ModalController} from '@ionic/angular';


@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage {
    public bill: Bill;
    public user: any;
    public userShow: any;
    public loading = false;
    public sum = 0;
    public restToTake = 0;

    // On doit recuperer la liste grâce à l'id provenant de validate bill
    constructor(public modalController: ModalController, private activeRoute: ActivatedRoute, protected billService: BillService,
                private router: Router, private authService: AuthentificationService,
                private cd: ChangeDetectorRef) {
        this.billService = billService;
        this.authService.getAuthUser().subscribe(
            user => {
                this.user = user;
                this.userShow = user;
                this.activeRoute.queryParams.subscribe(data => {
                    if (data && data['id'].length === 4) {
                        this.billService.getBillsByShortId(data['id'], new Date()).subscribe(
                            bill => {
                                this.loadData(bill);
                            }
                        );
                    } else {
                        this.billService.getBills(data['id']).subscribe(
                            bill => {
                                this.loadData(bill);
                            }
                        );
                    }
                });
            }
        );
    }

    private loadData(bill: Bill) {
        if (!this.loading) {
            this.bill = bill;
            this.sum = 0;
            this.restToTake = 0;
            if (this.bill && this.bill.products) {
                this.bill.products.forEach(product => {
                    this.restToTake += product.quantity - product.uids.length;
                    this.sum += product.uids.filter(uid => this.user.uid === uid).length * product.prix;
                });
            }
            if (this.user && this.user.uid && this.bill && !this.bill.users.find(u => u.uid === this.user.uid)) {
                this.bill.users.push(this.user);
                this.billService.addBill(this.bill).then();
            }
        }

    }

    /**
     * Permet d'attribuer une quantite d'un produit a un utilisateur ou de l'enlever
     * @param productIndex
     */
    public selectProduct(productIndex: number) {
        if (this.user !== this.userShow || this.bill.done) {
            return;
        }
        const updateBill = this.bill;
        // Si la liste est pleine et que je ne suis pas dedans, je ne peux pas interragir
        if (updateBill.products[productIndex].uids.length === updateBill.products[productIndex].quantity
            && !updateBill.products[productIndex].uids.includes(this.user.uid)) {
            return;
        }

        // Si il y a de la place, je me rajoute
        if (updateBill.products[productIndex].uids.length < updateBill.products[productIndex].quantity) {
            updateBill.products[productIndex].uids.push(this.user.uid);
        } else {
            // Si c'est plein, je m'enleve de la liste
            updateBill.products[productIndex].uids = updateBill.products[productIndex].uids.filter(uid => uid !== this.user.uid);
        }
        this.loading = true;
        this.billService.addBill(updateBill).then(() => {
                this.loading = false;
                this.sum = 0;
                this.restToTake = 0;
                this.bill.products.forEach(product => {
                    this.restToTake += product.quantity - product.uids.length;
                    this.sum += product.uids.filter(uid => this.user.uid === uid).length * product.prix;
                });
                this.cd.markForCheck();
            }
        );
    }

    /**
     * Permet de detecter quel user est celui connecte
     * @param user
     */
    seeUserData(user: UserInBase) {
        this.userShow = user;
        if (user.uid === this.user.uid) {
            this.userShow = this.user;
        }
    }

    /**
     * Passe a l'etape suivante
     */
    goToResult() {
        this.router.navigateByUrl('result?id=' + this.bill.ID);
    }

    /**
     * Ouvre une modal permetant de diffuser l'id de la bill
     */
    async openModalJoin() {
        const modal = await this.modalController.create({
            component: UserJoinPage,
            componentProps: {
                action: 'Rejoindre',
                id: this.bill.ID.substring(0, 4),
            },
            cssClass: 'wideModal'
        });
        return await modal.present();
    }
}
