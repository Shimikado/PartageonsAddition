import {Component, OnInit} from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

    public element: any;

    constructor(public viewCtrl: ViewController) {
        this.element = {name: '', value: 0, quantity: 0};
    }

    ngOnInit() {
    }

    public addItem() {
        this.viewCtrl.dismiss(this.element);
    }
}
