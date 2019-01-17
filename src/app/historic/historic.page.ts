import {Component, OnInit} from '@angular/core';
import {FactureService} from '../shared/services/factureService';
import {Facture} from '../shared/models/facture';

@Component({
    selector: 'app-historic',
    templateUrl: './historic.page.html',
    styleUrls: ['./historic.page.scss'],
})
export class HistoricPage implements OnInit {
    private factures: Facture[];

    constructor(private factureService: FactureService) {
    }

    ngOnInit() {
        debugger;
    }

}
