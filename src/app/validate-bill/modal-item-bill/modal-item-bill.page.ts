import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Produit} from '../../shared/models/produit';


@Component({
  selector: 'app-modal-item-bill',
  templateUrl: './modal-item-bill.page.html',
  styleUrls: ['./modal-item-bill.page.scss'],
})
export class ModalItemBillPage implements OnInit {
  produit = {} as Produit;

  constructor(private modalCtrl: ModalController) {

  }

  ngOnInit() {

  }

    public addItem(produit) {
        console.log(produit);
        this.modalCtrl.dismiss(this.produit);
    }

}
