import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JoinPage} from './join.page';
import {FormBuilder} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicStorageModule} from '@ionic/storage';
import {FactureService} from '../shared/services/factureService';
import {ToastController} from '@ionic/angular';

describe('JoinPage', () => {
    let component: JoinPage;
    let fixture: ComponentFixture<JoinPage>;
    let formBuilderSpy;
    let factureServiceSpy;
    let toastControllerSpy;

    beforeEach(async(() => {
        formBuilderSpy = {
            group: () => {
                return {valid: true};
            }
        };
        factureServiceSpy = {};
        toastControllerSpy = {};
        TestBed.configureTestingModule({
            declarations: [JoinPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: FormBuilder, useValue: formBuilderSpy},
                {provide: FactureService, useValue: factureServiceSpy},
                {provide: ToastController, useValue: toastControllerSpy},
            ],
            imports: [RouterTestingModule.withRoutes([]),
                IonicStorageModule.forRoot()],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JoinPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
