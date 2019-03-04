import { Component, OnInit } from '@angular/core';
import {UserInBase} from '../shared/models/userInBase';
import {User} from '../shared/models/user';


@Component({
  selector: 'app-debt',
  templateUrl: './debt.page.html',
  styleUrls: ['./debt.page.scss'],
})
export class DebtPage implements OnInit {
    user = {} as User;
    user2 = {} as User;
  constructor() {
      this.user.name = 'Jeremie';
      this.user2.name = 'Benjamin';
  }

  ngOnInit() {
  }

}
