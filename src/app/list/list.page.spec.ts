import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListPage} from './list.page';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicStorageModule} from '@ionic/storage';
import {FactureService} from '../shared/services/factureService';
import {AngularFirestore} from '@angular/fire/firestore';
import {of} from 'rxjs';
import {ModalController} from '@ionic/angular';

describe('ListPage', () => {
    let component: ListPage;
    let fixture: ComponentFixture<ListPage>;
    let factureServiceSpy;
    let angularFirestoreSpy;
    let modalControllerSpy;

    beforeEach(async(() => {
        factureServiceSpy = {
            getFacturesByShortId: () => {
                return of({produits: []});
            }
        };
        angularFirestoreSpy = {};
        modalControllerSpy = {};
        TestBed.configureTestingModule({
            declarations: [ListPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: FactureService, useValue: factureServiceSpy},
                {provide: AngularFirestore, useValue: angularFirestoreSpy},
                {provide: ModalController, useValue: modalControllerSpy},
            ],
            imports: [RouterTestingModule.withRoutes([]),
                IonicStorageModule.forRoot()],
        })
            .compileComponents();
    }));

    beforeEach(async () => {
        fixture = await TestBed.createComponent(ListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
