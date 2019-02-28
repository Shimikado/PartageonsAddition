import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserBubbleComponent} from './user-bubble.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('UserBubbleComponent', () => {
    let component: UserBubbleComponent;
    let fixture: ComponentFixture<UserBubbleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserBubbleComponent],
            schemas: [NO_ERRORS_SCHEMA],
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
