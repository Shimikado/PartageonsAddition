import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserJoinPage } from './user-join.page';

describe('UserJoinPage', () => {
  let component: UserJoinPage;
  let fixture: ComponentFixture<UserJoinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserJoinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserJoinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
