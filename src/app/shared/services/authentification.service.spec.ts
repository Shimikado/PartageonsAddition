import {TestBed} from '@angular/core/testing';

import {AuthentificationService} from './authentification.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicStorageModule} from '@ionic/storage';

describe('AuthentificationService', () => {
    let angularFirestoreSpy;
    beforeEach(async () => {
        angularFirestoreSpy = {};
        TestBed.configureTestingModule({
            providers: [
                {provide: AngularFirestore, useValue: angularFirestoreSpy},
            ],
            imports: [RouterTestingModule.withRoutes([]),
                IonicStorageModule.forRoot()],
        });
    });

    it('should be created', () => {
        const service: AuthentificationService = TestBed.get(AuthentificationService);
        expect(service).toBeTruthy();
    });
});
