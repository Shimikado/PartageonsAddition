import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtPage } from './debt.page';

describe('DebtPage', () => {
  let component: DebtPage;
  let fixture: ComponentFixture<DebtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
