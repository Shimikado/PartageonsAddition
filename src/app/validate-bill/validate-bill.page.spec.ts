import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ValidateBillPage} from './validate-bill.page';
import {AlertController, ModalController} from '@ionic/angular';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicStorageModule} from '@ionic/storage';
import {FactureService} from '../shared/services/factureService';
import {AngularFirestore} from '@angular/fire/firestore';

describe('ValidateBillPage', () => {
    let component: ValidateBillPage;
    let fixture: ComponentFixture<ValidateBillPage>;
    let modalControllerSpy;
    let factureServiceSpy;
    let angularFirestoreSpy;
    let alertControllerSpy;

    beforeEach(async(() => {
        modalControllerSpy = {};
        factureServiceSpy = {};
        angularFirestoreSpy = {};
        alertControllerSpy = {};
        TestBed.configureTestingModule({
            declarations: [ValidateBillPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: ModalController, useValue: modalControllerSpy},
                {provide: FactureService, useValue: factureServiceSpy},
                {provide: AngularFirestore, useValue: angularFirestoreSpy},
                {provide: AlertController, useValue: alertControllerSpy},
            ],
            imports: [RouterTestingModule.withRoutes([]),
                IonicStorageModule.forRoot()],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ValidateBillPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
