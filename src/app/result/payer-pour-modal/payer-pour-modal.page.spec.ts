import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PayerPourModalPage} from './payer-pour-modal.page';
import {ModalController} from '@ionic/angular';

describe('PayerPourModalPage', () => {
    let component: PayerPourModalPage;
    let fixture: ComponentFixture<PayerPourModalPage>;
    let modalControllerSpy;

    beforeEach(async(() => {
        modalControllerSpy = {};
        TestBed.configureTestingModule({
            declarations: [PayerPourModalPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: ModalController, useValue: modalControllerSpy},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PayerPourModalPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
