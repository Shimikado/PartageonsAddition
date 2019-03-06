import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/user';
import {Dette} from '../shared/models/dette';
import {DebtModalPage} from './debt-modal/debt-modal.page';
import {ModalController} from '@ionic/angular';
import {DetteService} from '../shared/services/detteService';
import {AuthentificationService} from '../shared/services/authentification.service';


@Component({
    selector: 'app-debt',
    templateUrl: './debt.page.html',
    styleUrls: ['./debt.page.scss'],
})
export class DebtPage implements OnInit {
    user = {} as User;
    user2 = {} as User;
    dette = {} as Dette;
    activeDettes = [];
    refundDettes = [];

    constructor(public modalController: ModalController, public detteService: DetteService,
                private authService: AuthentificationService,) {

        /* TODO -> A supprimer car sera charger depuis la page payer pour */
        /* initialisation d'une dette au démarrage de la page pour pouvoir tester */
        this.user.name = 'Jeremie';
        this.user2.name = 'Benjamin';
        this.dette.userWho = this.user;
        this.dette.userTo = this.user2;
        this.dette.amount = 35;
        this.dette.createdDate = new Date();
        this.dette.factures = [];
        this.dette.refund = false;
        this.dette.users = [];
        this.dette.users.push(this.user);
        this.dette.users.push(this.user2);
        this.detteService.addDette(this.dette);

        this.loadData();
    }

    ngOnInit() {
    }

    private loadData() {
        this.activeDettes = [];
        this.refundDettes = [];
        /* Initialisation des dettes actives */
        this.detteService.getDettesByUser(this.user, false).then((querySnapshot) => {
            querySnapshot.forEach((det) => {
                const d = {...det.data() as Dette};
                /* Récupération de l'ID doc Firestore */
                d.ID = det.id;
                this.activeDettes.push(d);
            });
        });


        /* Initialisation des dettes remboursée */
        this.detteService.getDettesByUser(this.user, true).then((querySnapshot) => {
            querySnapshot.forEach((det) => {
                const d = {...det.data() as Dette};
                /* Récupération de l'ID doc Firestore */
                d.ID = det.id;
                this.refundDettes.push(d);
            });
        });
    }

    async openModalDebt(detteModal: Dette) {
        const modal = await this.modalController.create({
            component: DebtModalPage,
            componentProps: {
                dette: detteModal,
            },
            cssClass: 'wideModal'
        });

        modal.onDidDismiss()
            .then((data) => {
                if (data && data.data) {
                    const dette: Dette = data.data;
                    this.detteService.doRefund(dette).then(() => {
                            console.log('refund OK');
                            this.loadData();
                            /*  TODO -> this.activeDettes.filter avec le dette.ID &  this.refundDettes.push avec dette pour MAJ de l'écran
                             */
                        }
                    );
                }
            });
        return await modal.present();
    }

}
