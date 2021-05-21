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
  UserActionTypes,
} from './user.actions';

import { StopLoader } from '../../state/loader/loader.actions';

/* Models */
import { User } from '../../models';

@Injectable()
export class UsersEffects {
  constructor(private $actions: Actions, private _usersService: UsersService) {}

  /**
   * Effect to listen for the LoadClients action
   * and make http request to load clients
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
}
