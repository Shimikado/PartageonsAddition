import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FactureService} from '../shared/services/factureService';
import {Facture} from '../shared/models/facture';
import {Produit} from '../shared/models/produit';
import {AuthentificationService} from '../shared/services/authentification.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    public facture: Facture;
    private user: any;

    // On doit recuperer la liste grâce à l'id provenant de validate bill
    constructor(private activeRoute: ActivatedRoute, private factureService: FactureService,
                private authService: AuthentificationService, private afAuth: AngularFireAuth) {
        this.authService.getAuthUser().subscribe(
            user => {
                this.user = user;
                this.activeRoute.queryParams.subscribe(data => {
                    this.factureService.getFacturesByShortId(data['id'], new Date()).subscribe(
                        facture => {
                            this.facture = facture;
                            if (this.user && this.user.uid && !this.facture.users_ID.includes(this.user.uid)) {
                                this.facture.users_ID.push(this.user);
                            }
                            this.facture.users_ID.forEach(uid => {
                                this.authService.getUser(uid).subscribe(
                                    userLoaded => {
                                        return;
                                    }
                                );
                            });
                        }
                    );
                });
            }
        );
    }

    ngOnInit() {
    }

    selectProduct(product: Produit) {
        product.nom = this.user;
    }
}
