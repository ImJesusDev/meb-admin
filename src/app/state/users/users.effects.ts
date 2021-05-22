import { Injectable } from '@angular/core';
/* NgRx */
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
/* Operators */
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

/* Services */
import { UsersService } from '../../services';

/* Actions */
import {
  LoadUsers,
  LoadUsersFail,
  LoadUsersSuccess,
  AddAdminStart,
  AddAdminSuccess,
  AddAdminFail,
  UserActionTypes,
} from './user.actions';

import { StopLoader } from '../../state/loader/loader.actions';

/* Models */
import { User, ApiError } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UsersEffects {
  constructor(private $actions: Actions, private _usersService: UsersService) {}

  /**
   * Effect to listen for the LoadUsers action
   * and make http request to load users
   * from API
   */
  $getUsers = createEffect(() => {
    return this.$actions.pipe(
      ofType(UserActionTypes.LoadUsers),
      switchMap((action: LoadUsers) =>
        this._usersService
          .getUsers()
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((users: User[]) => [
              new StopLoader(),
              new LoadUsersSuccess(users),
            ]),
            catchError((error) => of(new LoadUsersFail(error)))
          )
      )
    );
  });
  /**
   * Effect to listen for the AddAdmin action
   * and make http request to create admin
   * from API
   */
  $addAdmin = createEffect(() => {
    return this.$actions.pipe(
      ofType(UserActionTypes.AddAdminStart),
      switchMap((action: AddAdminStart) =>
        this._usersService
          .addAdmin(action.payload)
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((user: User) => [new AddAdminSuccess(user)]),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new AddAdminFail(errors));
            })
          )
      )
    );
  });
}
