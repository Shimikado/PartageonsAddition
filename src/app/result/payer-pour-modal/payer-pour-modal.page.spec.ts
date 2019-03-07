import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerPourModalPage } from './payer-pour-modal.page';

describe('PayerPourModalPage', () => {
  let component: PayerPourModalPage;
  let fixture: ComponentFixture<PayerPourModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayerPourModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayerPourModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
