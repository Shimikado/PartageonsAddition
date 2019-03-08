import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DebtPage} from './debt.page';
import {ModalController} from '@ionic/angular';
import {DetteService} from '../shared/services/detteService';
import {AngularFirestore} from '@angular/fire/firestore';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicStorageModule} from '@ionic/storage';
import {of} from 'rxjs';

describe('DebtPage', () => {
    let component: DebtPage;
    let fixture: ComponentFixture<DebtPage>;
    let modalControllerSpy;
    let detteServiceSpy;
    let angularFirestoreSpy;

    beforeEach(async(() => {
        modalControllerSpy = {};
        detteServiceSpy = {
            getDettesByUser: () => {
                return Promise.resolve();
            }
        };
        angularFirestoreSpy = {};
        TestBed.configureTestingModule({
            declarations: [DebtPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ModalController, useValue: modalControllerSpy},
                {provide: DetteService, useValue: detteServiceSpy},
                {provide: AngularFirestore, useValue: angularFirestoreSpy},
            ],
            imports: [RouterTestingModule.withRoutes([]),
                IonicStorageModule.forRoot()],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DebtPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
