import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateBillPage } from './validate-bill.page';

describe('ValidateBillPage', () => {
  let component: ValidateBillPage;
  let fixture: ComponentFixture<ValidateBillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateBillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateBillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
