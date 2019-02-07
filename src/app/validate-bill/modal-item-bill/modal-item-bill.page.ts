import { Component, OnInit, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Produit} from '../../shared/models/produit';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-modal-item-bill',
  templateUrl: './modal-item-bill.page.html',
  styleUrls: ['./modal-item-bill.page.scss'],
})
export class ModalItemBillPage implements OnInit {
  produit = {} as Produit;
  action: string;

  productForm: FormGroup;

  constructor(private modalCtrl: ModalController) {
/*
      this.getClassroom(this.route.snapshot.paramMap.get('id'));
      this.productForm = this.formBuilder.group({
          'quantity' : [null, Validators.required],
          'quantity' : [null, Validators.required]
      );
*/
  }

  ngOnInit() {


      console.log('ACTION ------- ' + this.action);

  }

    public addItem(produit) {
        console.log(produit);
        this.modalCtrl.dismiss(this.produit);
    }

}
