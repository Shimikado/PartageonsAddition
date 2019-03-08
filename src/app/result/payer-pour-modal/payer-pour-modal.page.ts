import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';


@Component({
    selector: 'app-payer-pour-modal',
    templateUrl: './payer-pour-modal.page.html',
    styleUrls: ['./payer-pour-modal.page.scss'],
})
export class PayerPourModalPage implements OnInit {
    public user: any;
    public users: any[];
    public usersSelected: any[] = [];

    constructor(public modalController: ModalController) {
    }

    ngOnInit() {
    }

    public selectUser(userSelected: any) {
        if (!this.isSelected(userSelected)) {
            this.usersSelected.push(userSelected);
        } else {
            this.usersSelected = this.usersSelected.filter(u => u.uid !== userSelected.uid);
        }
    }

    public isSelected(userElement: any) {
        return this.usersSelected.findIndex(u => u.uid === userElement.uid) >= 0;
    }

    public validateSelection() {
        let result = this.users;
        if (this.usersSelected.length > 0) {
            this.users.forEach(
                user_element => {
                    if (user_element.uid !== this.user.uid) {
                        if (this.usersSelected.findIndex(u => u.uid === user_element.uid) >= 0) {
                            this.user.debts_user.push(user_element);
                            result = result.filter(u => u.uid !== user_element.uid);
                        }
                    }
                }
            );
        }
        this.modalController.dismiss(result);
    }

    public close() {
        this.modalController.dismiss();
    }


}
