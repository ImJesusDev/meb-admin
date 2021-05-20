import { Component, OnInit } from '@angular/core';
/* Models */
import { Login } from '../../models';
/* Actions */
import { LoginStart } from '../../state/auth/auth.actions';
/* NgRx */
import { Store } from '@ngrx/store';
/* State */
import { State } from '../../state/state';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    // Dispatch action to set auth
    const login: Login = {
      email: 'test@mail.com',
      password: '1234',
    };
    this.store.dispatch(new LoginStart(login));
  }
}
