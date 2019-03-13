import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoricPage} from './historic.page';
import {BillService} from '../shared/services/bill.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicStorageModule} from '@ionic/storage';

describe('HistoricPage', () => {
    let component: HistoricPage;
    let fixture: ComponentFixture<HistoricPage>;
    let factureServiceSpy;
    let angularFirestoreSpy;

    beforeEach(async(() => {
        factureServiceSpy = {};
        angularFirestoreSpy = {};
        TestBed.configureTestingModule({
            declarations: [HistoricPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: BillService, useValue: factureServiceSpy},
                {provide: AngularFirestore, useValue: angularFirestoreSpy},
            ],
            imports: [RouterTestingModule.withRoutes([]),
                IonicStorageModule.forRoot()],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HistoricPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
