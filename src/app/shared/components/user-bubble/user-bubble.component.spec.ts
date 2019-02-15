import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBubbleComponent } from './user-bubble.component';

describe('UserBubbleComponent', () => {
  let component: UserBubbleComponent;
  let fixture: ComponentFixture<UserBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
