import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListPage} from './list.page';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicStorageModule} from '@ionic/storage';
import {FactureService} from '../shared/services/factureService';
import {AngularFirestore} from '@angular/fire/firestore';
import {of} from 'rxjs';

describe('ListPage', () => {
    let component: ListPage;
    let fixture: ComponentFixture<ListPage>;
    let factureServiceSpy;
    let angularFirestoreSpy;

    beforeEach(async(() => {
        factureServiceSpy = {
            getFacturesByShortId: () => {
                return of({produits: []});
            }
        };
        angularFirestoreSpy = {};
        TestBed.configureTestingModule({
            declarations: [ListPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: FactureService, useValue: factureServiceSpy},
                {provide: AngularFirestore, useValue: angularFirestoreSpy},
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
