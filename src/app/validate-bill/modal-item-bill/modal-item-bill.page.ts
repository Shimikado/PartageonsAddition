import { Component, OnInit, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Produit} from '../../shared/models/produit';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-modal-item-bill',
  templateUrl: './modal-item-bill.page.html',
  styleUrls: ['./modal-item-bill.page.scss'],
})
export class ModalItemBillPage implements OnInit {
  produit = {devise: '€', uids: []} as Produit;
  action: string;

  item_form: FormGroup;

  constructor(private modalCtrl: ModalController,
    public formBuilder: FormBuilder) {

      this.item_form = this.formBuilder.group({
          quantite: new FormControl(this.produit.quantity, Validators.required),
          label: new FormControl(this.produit.label, Validators.required),
          prix: new FormControl(this.produit.prix, Validators.required),
      });
  }

  ngOnInit() {

  }

    public addItem(produit) {
        this.modalCtrl.dismiss(this.produit);
    }

    public close() {
        this.modalCtrl.dismiss();
    }
}
