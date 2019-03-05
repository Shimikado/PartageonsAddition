import {Component, OnInit} from '@angular/core';
import {FactureService} from '../shared/services/factureService';
import {Facture} from '../shared/models/facture';
import {AuthentificationService} from '../shared/services/authentification.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-historic',
    templateUrl: './historic.page.html',
    styleUrls: ['./historic.page.scss'],
})
export class HistoricPage implements OnInit {
    private factures: Facture[];

    constructor(private factureService: FactureService, private authService: AuthentificationService,
                private router: Router) {
        this.authService.getAuthUser().subscribe(
            user => {
                if (!user) {
                    return;
                }
                this.factureService.getAllFactures().subscribe(factures => {
                    this.factures = factures.filter(facture => {
                        return facture.users.findIndex(userFacture => userFacture.uid === user.uid) >= 0;
                    });
                });
            }
        );
    }

    ngOnInit() {
    }

    public getSumWithDevise(facture: Facture): string {
        let sum = 0;
        let devise = '€';
        if (facture.produits) {
            facture.produits.forEach(
                produit => {
                    sum += produit.prix;
                    devise = produit.devise;
                }
            );
        }
        return sum + ' ' + devise;
    }

    public goToFacture(facture: Facture) {
        this.router.navigateByUrl('result?id=' + facture.ID.substring(0, 4));
    }
}
