import {ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FactureService} from '../shared/services/factureService';
import {AuthentificationService} from '../shared/services/authentification.service';


@Component({
    selector: 'app-result',
    templateUrl: './result.page.html',
    styleUrls: ['./result.page.scss'],
})
export class ResultPage {
    public user: any;
    public userShow: any;
    public facture: any;

    public users_prices = [];


    constructor(private activeRoute: ActivatedRoute, protected factureService: FactureService,
                private router: Router, private authService: AuthentificationService,
                private cd: ChangeDetectorRef) {


        this.activeRoute.queryParams.subscribe(data => {
            this.factureService.getFacturesByShortId(data['id'], new Date()).subscribe(
                facture => {
                    this.facture = facture;
                    console.log(facture);
                    facture.produits.forEach(produit => {
                            produit.uids.forEach(uid => {
                                let user_found_index: number = this.users_prices.findIndex(u => u.uid === uid);
                                if (user_found_index < 0) {
                                    this.users_prices.push({uid: uid, name: this.getUserName(uid),  price: 0});
                                    user_found_index = this.users_prices.length - 1;
                                }

                                this.users_prices[user_found_index].price += produit.prix;
                                if (!this.users_prices[user_found_index].devise) {
                                    this.users_prices[user_found_index].devise = produit.devise;
                                }
                            });
                        }
                    );
                    console.log(this.users_prices);
                    console.log(this.facture);
                });

        });
    }

    public getUserName(uid: string): string {
        return this.facture.users.find(u => u.uid === uid).name;
    }



}
