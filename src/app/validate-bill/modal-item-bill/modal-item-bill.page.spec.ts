import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemBillPage } from './modal-item-bill.page';

describe('ModalItemBillPage', () => {
  let component: ModalItemBillPage;
  let fixture: ComponentFixture<ModalItemBillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalItemBillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalItemBillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
