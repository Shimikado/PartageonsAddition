import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtModalPage } from './debt-modal.page';

describe('DebtModalPage', () => {
  let component: DebtModalPage;
  let fixture: ComponentFixture<DebtModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
