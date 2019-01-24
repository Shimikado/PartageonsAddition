import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FactureService} from '../shared/services/factureService';
import {Facture} from '../shared/models/facture';
import {Produit} from '../shared/models/produit';
import {AuthentificationService} from '../shared/services/authentification.service';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    public facture: Facture;
    private effectiveFacture: Facture;
    private user: any;

    // On doit recuperer la liste grâce à l'id provenant de validate bill
    constructor(private activeRoute: ActivatedRoute, private factureService: FactureService,
                private authentifcationService: AuthentificationService) {
        this.activeRoute.queryParams.subscribe(data => {
            this.factureService.getFactures(data['id']).subscribe(
                facture => {
                    this.facture = facture;
                }
            );
        });
        this.authentifcationService.getAuthToken().subscribe(
            token => {
                this.user = token;
            }
        );
    }

    ngOnInit() {
    }

    selectProduct(product: Produit) {
        product.nom = this.user;
    }
}
