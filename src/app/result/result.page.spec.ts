import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResultPage} from './result.page';
import {ActivatedRoute, Router} from '@angular/router';
import {FactureService} from '../shared/services/factureService';
import {AngularFirestore} from '@angular/fire/firestore';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicStorageModule} from '@ionic/storage';
import {ModalController, ToastController} from '@ionic/angular';
import {DetteService} from '../shared/services/detteService';
import {of} from 'rxjs';

describe('ResultPage', () => {
    let component: ResultPage;
    let fixture: ComponentFixture<ResultPage>;
    let activatedRouteSpy;
    let factureServiceSpy;
    let routerSpy;
    let angularFirestoreSpy;
    let toastControllerSpy;
    let modalControllerSpy;
    let detteServiceSpy;

    beforeEach(async(() => {
        activatedRouteSpy = {
            queryParams: of()
        };
        factureServiceSpy = {
            getFacturesByShortId: () => {
                return of();
            }
        };
        routerSpy = {};
        angularFirestoreSpy = {};
        toastControllerSpy = {};
        modalControllerSpy = {};
        detteServiceSpy = {
            getDettesByFactureID: () => {
                return of(null);
            }
        };
        TestBed.configureTestingModule({
            declarations: [ResultPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: ActivatedRoute, useValue: activatedRouteSpy},
                {provide: FactureService, useValue: factureServiceSpy},
                {provide: Router, useValue: routerSpy},
                {provide: AngularFirestore, useValue: angularFirestoreSpy},
                {provide: ToastController, useValue: toastControllerSpy},
                {provide: ModalController, useValue: modalControllerSpy},
                {provide: DetteService, useValue: detteServiceSpy},
            ],
            imports: [RouterTestingModule.withRoutes([]),
                IonicStorageModule.forRoot()],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
