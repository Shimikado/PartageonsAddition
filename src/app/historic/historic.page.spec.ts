import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoricPage} from './historic.page';
import {FactureService} from '../shared/services/factureService';

describe('HistoricPage', () => {
    let component: HistoricPage;
    let fixture: ComponentFixture<HistoricPage>;
    let factureServiceSpy;

    beforeEach(async(() => {
        factureServiceSpy = {};
        TestBed.configureTestingModule({
            declarations: [HistoricPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: FactureService, useValue: factureServiceSpy},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HistoricPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
