import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
/* Models */
import { Login, ApiError } from '../../models';
/* Actions */
import { LoginStart, LogOut } from '../../state/auth/auth.actions';
import { StartLoader } from '../../state/loader/loader.actions';
/* NgRx */
import { Store } from '@ngrx/store';
/* State */
import { State } from '../../state/state';

/* Selectors */
import { getAuthError } from '../../state/auth/auth.selector';
import { getLoader } from '../../state/loader/loader.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  login: Login;
  errors$: Observable<ApiError[]> = of([]);
  loader$: Observable<boolean> = of(false);

  constructor(private formBuilder: FormBuilder, private store: Store<State>) {
    this.errors$ = this.store.select(getAuthError);
    this.loader$ = this.store.select(getLoader);
    this.login = {
      email: '',
      password: '',
    };
    this.loginForm = this.formBuilder.group({
      email: [this.login.email, [Validators.required, Validators.email]],
      password: [
        this.login.password,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LogOut());
  }

  signIn(): void {
    this.store.dispatch(new StartLoader());
    this.store.dispatch(new LoginStart(this.loginForm.value));
  }
}
