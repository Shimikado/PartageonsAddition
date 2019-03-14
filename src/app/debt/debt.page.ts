import {Component} from '@angular/core';
import {User} from '../shared/models/user';
import {Debt} from '../shared/models/debt';
import {DebtModalPage} from './debt-modal/debt-modal.page';
import {ModalController} from '@ionic/angular';
import {DebtService} from '../shared/services/debt.service';
import {AuthentificationService} from '../shared/services/authentification.service';


@Component({
    selector: 'app-debt',
    templateUrl: './debt.page.html',
    styleUrls: ['./debt.page.scss'],
})
export class DebtPage {
    user = {} as User;
    debt = {} as Debt;
    activeDebts = [];
    refundDebts = [];

    constructor(public modalController: ModalController, public detteService: DebtService,
                private authService: AuthentificationService) {
        this.authService.getAuthUser().subscribe(currentUser => {
            this.user = currentUser;
        });
        this.loadData();
    }

    private loadData() {
        this.activeDebts = [];
        this.refundDebts = [];
        /* Initialisation des dettes actives */
        this.detteService.getDebtsByUser(this.user, false).then((querySnapshot) => {
            querySnapshot.forEach((debt) => {
                const d = {...debt.data() as Debt};
                /* Récupération de l'ID doc Firestore */
                d.ID = debt.id;
                this.activeDebts.push(d);
            });
        });


        /* Initialisation des dettes remboursée */
        this.detteService.getDebtsByUser(this.user, true).then((querySnapshot) => {
            querySnapshot.forEach((debt) => {
                const d = {...debt.data() as Debt};
                /* Récupération de l'ID doc Firestore */
                d.ID = debt.id;
                this.refundDebts.push(d);
            });
        });
    }

    /**
     * Ouvre une modal pour assigner une debt
     * @param debtModal
     */
    async openModalDebt(debtModal: Debt) {
        const modal = await this.modalController.create({
            component: DebtModalPage,
            componentProps: {
                debt: debtModal,
            },
            cssClass: 'wideModal'
        });

        modal.onDidDismiss()
            .then((data) => {
                if (data && data.data) {
                    const debt: Debt = data.data;
                    this.detteService.doRefund(debt).then(() => {
                            console.log('refund OK');
                            this.loadData();
                        }
                    );
                }
            });
        return await modal.present();
    }

}
