import {Component, OnInit} from '@angular/core';
import {FactureService} from '../shared/services/factureService';
import {Facture} from '../shared/models/facture';
import {AuthentificationService} from '../shared/services/authentification.service';
import {Router} from '@angular/router';
import {User} from '../shared/models/user';


@Component({
    selector: 'app-historic',
    templateUrl: './historic.page.html',
    styleUrls: ['./historic.page.scss'],
})
export class HistoricPage {
    private factures: Facture[];
    private user: User;

    constructor(private factureService: FactureService, private authService: AuthentificationService,
                private router: Router) {
        this.authService.getAuthUser().subscribe(
            user => {
                this.user = user;
                if (!user) {
                    return;
                }
                this.factures = [];
                this.factureService.getAllFactures(user).then((querySnapshot) => {
                    this.factures = [];
                    querySnapshot.forEach((facture) => {
                        const f = {...facture.data() as Facture};
                        this.factures.push(f);
                    });
                });
            }
        );
    }

    /**
     * Recupere une somme et une devise a afficher
     * @param facture
     */
    public getSumWithDevise(facture: Facture): string {
        let sum = 0;
        let devise = '€';
        if (facture.produits) {
            facture.produits.forEach(
                produit => {
                    const numberOfProductFound = produit.uids.filter(uid => uid === this.user.uid).length;
                    sum += produit.prix * numberOfProductFound;
                    devise = produit.devise;
                }
            );
        }
        return sum + ' ' + devise;
    }

    /**
     * Passe a la page resultat
     * @param facture
     */
    public goToFacture(facture: Facture) {
        this.router.navigateByUrl('result?id=' + facture.ID);
    }
}
