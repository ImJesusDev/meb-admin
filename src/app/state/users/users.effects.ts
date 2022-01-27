import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
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
  LoadTeam,
  LoadTeamFail,
  LoadTeamSuccess,
  LoadClientAdmin,
  LoadClientAdminFail,
  LoadClientAdminSuccess,
  AddAdminStart,
  AddAdminSuccess,
  AddAdminFail,
  UserActionTypes,
  LoadEps,
  LoadEpsFail,
  LoadEpsSuccess,
  LoadCountries,
  LoadCountriesFail,
  LoadCountriesSuccess,
  LoadTransportMethods,
  LoadTransportMethodsFail,
  LoadTransportMethodsSuccess,
} from './user.actions';

import { StopLoader } from '../../state/loader/loader.actions';

/* Models */
import { User, ApiError } from '../../models';

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
   * Effect to listen for the LoadTeam action
   * and make http request to load team members
   * from API
   */
  $getTeam = createEffect(() => {
    return this.$actions.pipe(
      ofType(UserActionTypes.LoadTeam),
      switchMap((action: LoadTeam) =>
        this._usersService
          .getTeam()
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((users: User[]) => [
              new StopLoader(),
              new LoadTeamSuccess(users),
            ]),
            catchError((error) => of(new LoadTeamFail(error)))
          )
      )
    );
  });

  $getEps = createEffect(() => {
    return this.$actions.pipe(
      ofType(UserActionTypes.LoadEps),
      switchMap((action: LoadEps) =>
        this._usersService
          .getEps()
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((eps: any[]) => [
              new StopLoader(),
              new LoadEpsSuccess(eps),
            ]),
            catchError((error) => of(new LoadEpsFail(error)))
          )
      )
    );
  });

  $getCountries = createEffect(() => {
    return this.$actions.pipe(
      ofType(UserActionTypes.LoadCountries),
      switchMap((action: LoadCountries) =>
        this._usersService
          .getCountries()
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((countries: any[]) => [
              new StopLoader(),
              new LoadCountriesSuccess(countries),
            ]),
            catchError((error) => of(new LoadCountriesFail(error)))
          )
      )
    );
  });

  $getTransportMethods = createEffect(() => {
    return this.$actions.pipe(
      ofType(UserActionTypes.LoadTransportMethods),
      switchMap((action: LoadTransportMethods) =>
        this._usersService
          .getTransportMethods()
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((mtransport: any[]) => [
              new StopLoader(),
              new LoadTransportMethodsSuccess(mtransport),
            ]),
            catchError((error) => of(new LoadTransportMethodsFail(error)))
          )
      )
    );
  });

  /**
   * Effect to listen for the LoadClientAdmin action
   * and make http request to load client admins
   * from API
   */
  $getClientAdmins = createEffect(() => {
    return this.$actions.pipe(
      ofType(UserActionTypes.LoadClientAdmin),
      switchMap((action: LoadClientAdmin) =>
        this._usersService
          .getClientAdmins()
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((users: User[]) => [
              new StopLoader(),
              new LoadClientAdminSuccess(users),
            ]),
            catchError((error) => of(new LoadClientAdminFail(error)))
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
            mergeMap((user: User) => [
              new StopLoader(),
              new AddAdminSuccess(user),
            ]),
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
