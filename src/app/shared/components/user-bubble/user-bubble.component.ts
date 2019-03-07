import {Component, Input, OnInit} from '@angular/core';
import {UserInBase} from '../../models/userInBase';

@Component({
    selector: 'app-user-bubble',
    templateUrl: './user-bubble.component.html',
    styleUrls: ['./user-bubble.component.scss']
})
export class UserBubbleComponent implements OnInit {

    @Input()
    public user: UserInBase;

    @Input()
    public active: Boolean;

    @Input()
    public selected = true;

    constructor() {
    }

    ngOnInit() {
    }

}
