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
  LogOut,
  LoginSuccess,
  AuthActionTypes,
} from './auth.actions';

import { StopLoader } from '../loader/loader.actions';
import { ApiError, User } from '../../models';
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
            mergeMap((user: User) => {
              if (user.role === 'user') {
                const errors = [{ message: 'Unauthorized' }];
                return of(new LoginFail(errors), new StopLoader());
              }
              console.log(user);
              localStorage.setItem(
                'role',
                `${user.role}`
              );
              localStorage.setItem(
                'fullName',
                `${user.firstName} ${user.lastName}`
              );
              localStorage.setItem('photoUrl', user.photo ? user.photo : '');
              return [new StopLoader(), new LoginSuccess()];
            }),
            tap((action) => {
              switch (action.type) {
                case AuthActionTypes.LoginFail:
                  this.router.navigate(['/auth']);
                  break;
                case AuthActionTypes.LoginSuccess:
                  switch (localStorage.getItem('role')) {
                    case 'admin':
                      this.router.navigate(['/clientes']);
                      break;
                    // case 'admin':
                    //   this.router.navigate(['/clientes']);
                    //   break;
                    // case 'admin':
                    //   this.router.navigate(['/clientes']);
                    //   break;
                    // case 'admin':
                    //   this.router.navigate(['/clientes']);
                    //   break;
                    // case 'admin':
                    //   this.router.navigate(['/clientes']);
                    //   break;
                    // case 'admin':
                    //   this.router.navigate(['/clientes']);
                    //   break;
                    // case 'admin':
                    //   this.router.navigate(['/clientes']);
                    //   break;
                  }                  
                  break;
                default:
                  break;
              }
            }),
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
  /**
   * Effect to listen for the LoginStart action
   * and make http request to API
   *
   */
  $logout = createEffect(() => {
    return this.$actions.pipe(
      ofType(AuthActionTypes.LogOut),
      switchMap((action: LogOut) =>
        this._authService
          .logOut()
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((_) => {
              localStorage.clear();
              return [new StopLoader()];
            }),
            tap(() => {
              this.router.navigate(['/auth']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new StopLoader());
            })
          )
      )
    );
  });
}
