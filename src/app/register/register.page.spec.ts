import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterPage} from './register.page';
import {FormsModule} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicStorageModule} from '@ionic/storage';
import {ToastController} from '@ionic/angular';
import {User} from '../shared/models/user';

describe('RegisterPage', () => {
    let component: RegisterPage;
    let fixture: ComponentFixture<RegisterPage>;
    let angularFireAuthSpy;
    let toastControllerSpy;

    beforeEach(async(() => {
        angularFireAuthSpy = {};
        toastControllerSpy = {};
        TestBed.configureTestingModule({
            declarations: [RegisterPage],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: AngularFireAuth, useValue: angularFireAuthSpy},
                {provide: ToastController, useValue: toastControllerSpy},
            ],
            imports: [FormsModule, RouterTestingModule.withRoutes([]),
                IonicStorageModule.forRoot()],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterPage);
        component = fixture.componentInstance;
        component.user = {name: '', email: '', password: ''} as User;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
