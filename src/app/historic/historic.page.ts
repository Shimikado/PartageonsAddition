import {Component, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {Bill} from '../shared/models/bill';
import {AuthentificationService} from '../shared/services/authentification.service';
import {Router} from '@angular/router';
import {User} from '../shared/models/user';


@Component({
    selector: 'app-historic',
    templateUrl: './historic.page.html',
    styleUrls: ['./historic.page.scss'],
})
export class HistoricPage {
    private bills: Bill[];
    private user: User;

    constructor(private billService: BillService, private authService: AuthentificationService,
                private router: Router) {
        this.authService.getAuthUser().subscribe(
            user => {
                this.user = user;
                if (!user) {
                    return;
                }

                this.bills = [];
                this.billService.getAllBills(user).then((querySnapshot) => {
                    this.bills = [];
                    querySnapshot.forEach((bill) => {
                        const f = {...bill.data() as Bill};
                        this.bills.push(f);
                    });
                });
            }
        );
    }

    /**
     * Recupere une somme et une devise a afficher
     * @param bill
     */
    public getSumWithDevise(bill: Bill): string {
        let sum = 0;
        let devise = '€';
        if (bill.products) {
            bill.products.forEach(
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
     * @param bill
     */
    public goToBill(bill: Bill) {
        this.router.navigateByUrl('result?id=' + bill.ID);
    }
}
