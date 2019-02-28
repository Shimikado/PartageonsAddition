import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePage} from './home.page';
import {AngularFireAuth} from '@angular/fire/auth';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicStorageModule} from '@ionic/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {ToastController} from '@ionic/angular';

describe('HomePage', () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;
    let angularFireAuthSpy;
    let angularFirestoreSpy;
    let toastControllerSpy;

    beforeEach(async(() => {
        angularFireAuthSpy = {};
        angularFirestoreSpy = {};
        toastControllerSpy = {};
        TestBed.configureTestingModule({
            declarations: [HomePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: AngularFireAuth, useValue: angularFireAuthSpy},
                {provide: AngularFirestore, useValue: angularFirestoreSpy},
                {provide: ToastController, useValue: toastControllerSpy},
            ],
            imports: [RouterTestingModule.withRoutes([]),
                IonicStorageModule.forRoot()],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
