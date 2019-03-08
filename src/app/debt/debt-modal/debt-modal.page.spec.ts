import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DebtModalPage} from './debt-modal.page';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';

describe('DebtModalPage', () => {
    let component: DebtModalPage;
    let fixture: ComponentFixture<DebtModalPage>;
    let modalControllerSpy;
    let routerSpy;

    beforeEach(async(() => {
        modalControllerSpy = {};
        routerSpy = {};
        TestBed.configureTestingModule({
            declarations: [DebtModalPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: ModalController, useValue: modalControllerSpy},
                {provide: Router, useValue: routerSpy},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DebtModalPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
