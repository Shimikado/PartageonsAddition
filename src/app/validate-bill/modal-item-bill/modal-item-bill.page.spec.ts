import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalItemBillPage} from './modal-item-bill.page';
import {ModalController} from '@ionic/angular';
import {FormBuilder} from '@angular/forms';

describe('ModalItemBillPage', () => {
    let component: ModalItemBillPage;
    let fixture: ComponentFixture<ModalItemBillPage>;
    let modalControllerSpy;
    let formBuilderSpy;

    beforeEach(async(() => {
        modalControllerSpy = {};
        formBuilderSpy = {
            group: () => {
                return {valid: true};
            }
        };
        TestBed.configureTestingModule({
            declarations: [ModalItemBillPage],
            providers: [
                {provide: ModalController, useValue: modalControllerSpy},
                {provide: FormBuilder, useValue: formBuilderSpy},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalItemBillPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
