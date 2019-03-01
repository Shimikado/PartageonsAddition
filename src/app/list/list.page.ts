import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FactureService} from '../shared/services/factureService';
import {Facture} from '../shared/models/facture';
import {AuthentificationService} from '../shared/services/authentification.service';
import {UserInBase} from '../shared/models/userInBase';
import {UserJoinPage} from './user-join/user-join.page';
import {ModalController} from '@ionic/angular';
import {ModalItemBillPage} from '../validate-bill/modal-item-bill/modal-item-bill.page';
import {isUndefined} from "util";
import {Produit} from '../shared/models/produit';


@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    public facture: Facture;
    public user: any;
    public userShow: any;
    private REFRESH_TIMER = 2000;
    public loading = false;
    public sum = 0;
    public restToTake = 0;

    // On doit recuperer la liste grâce à l'id provenant de validate bill
    constructor(public modalController: ModalController, private activeRoute: ActivatedRoute, protected factureService: FactureService,
                private router: Router, private authService: AuthentificationService,
                private cd: ChangeDetectorRef) {
        this.factureService = factureService;
        this.authService.getAuthUser().subscribe(
            user => {
                this.user = user;
                this.userShow = user;
                this.activeRoute.queryParams.subscribe(data => {
                    this.factureService.getFacturesByShortId(data['id'], new Date()).subscribe(
                        facture => {
                            if (!this.loading) {
                                this.facture = facture;
                                this.sum = 0;
                                this.restToTake = 0;
                                if (this.facture && this.facture.produits) {
                                    this.facture.produits.forEach(product => {
                                        this.restToTake += product.quantity - product.uids.length;
                                        this.sum += product.uids.filter(uid => this.user.uid === uid).length * product.prix;
                                    });
                                }
                                if (this.user && this.user.uid && this.facture && !this.facture.users.find(u => u.uid === this.user.uid)) {
                                    this.facture.users.push(this.user);
                                    this.factureService.addFacture(this.facture).then();
                                }
                            }
                        }
                    );
                });
            }
        );
    }

    ngOnInit() {
    }

    public selectProduct(productIndex: number) {
        if (this.user !== this.userShow) {
            return;
        }
        const updateFacture = this.facture;
        // Si la liste est pleine et que je ne suis pas dedans, je ne peux pas interragir
        if (updateFacture.produits[productIndex].uids.length === updateFacture.produits[productIndex].quantity
            && !updateFacture.produits[productIndex].uids.includes(this.user.uid)) {
            return;
        }

        // Si il y a de la place, je me rajoute
        if (updateFacture.produits[productIndex].uids.length < updateFacture.produits[productIndex].quantity) {
            updateFacture.produits[productIndex].uids.push(this.user.uid);
        } else {
            // Si c'est plein, je m'enleve de la liste
            updateFacture.produits[productIndex].uids = updateFacture.produits[productIndex].uids.filter(uid => uid !== this.user.uid);
        }
        this.loading = true;
        this.factureService.addFacture(updateFacture).then(() => {
                this.loading = false;
                this.sum = 0;
                this.restToTake = 0;
                this.facture.produits.forEach(product => {
                    this.restToTake += product.quantity - product.uids.length;
                    this.sum += product.uids.filter(uid => this.user.uid === uid).length * product.prix;
                });
                this.cd.markForCheck();
            }
        );
    }

    seeUserData(user: UserInBase) {
        this.userShow = user;
        if (user.uid === this.user.uid) {
            this.userShow = this.user;
        }
    }

    goToResult() {
        this.router.navigateByUrl('result?id=' + this.facture.ID.substring(0, 4));
    }

    async openModalJoin() {
        const modal = await this.modalController.create({
            component: UserJoinPage,
            componentProps: {
                action: 'Rejoindre',
                id: this.facture.ID.substring(0, 4),
            },
            cssClass: 'wideModal'
        });
        return await modal.present();
    }
}
