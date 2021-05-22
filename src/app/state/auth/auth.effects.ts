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
import { ApiError } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';
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
            tap(() => this.router.navigate(['/clientes'])),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new LoginFail(errors), new StopLoader());
            })
          )
      )
    );
  });
}
