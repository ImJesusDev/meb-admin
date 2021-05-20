import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
/* NgRx */
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
/* Operators */
import { switchMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

/* Services */
import { AuthService } from '../../services';

/* Actions */
import {
  LoginStart,
  LoginFail,
  LoginSuccess,
  AuthActionTypes,
} from './auth.actions';

import { StopLoader } from '../loader/loader.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private $actions: Actions,
    private _authService: AuthService,
    private router: Router
  ) {}

  /**
   * Effect to listen for the LoginStart action
   * and make http request to API
   *
   */
  $login = createEffect(() => {
    return this.$actions.pipe(
      ofType(AuthActionTypes.LoginStart),
      switchMap((action: LoginStart) =>
        this._authService
          .login(action.payload)
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((user: any) => [new StopLoader(), new LoginSuccess()]),
            tap(() => this.router.navigate(['/clients'])),
            catchError((error) => of(new LoginFail(error)))
          )
      )
    );
  });
}
