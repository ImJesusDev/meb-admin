import { Action } from '@ngrx/store';
import { User, ApiError } from '../../models';

export enum UserActionTypes {
  LoadUsers = '[Users] Load Users',
  LoadUsersSuccess = '[Users] Load Users Success',
  LoadUsersFail = '[Users] Load Users Fail',
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;
}

export class LoadUsersSuccess implements Action {
  readonly type = UserActionTypes.LoadUsersSuccess;
  constructor(public payload: User[]) {}
}
export class LoadUsersFail implements Action {
  readonly type = UserActionTypes.LoadUsersFail;
  constructor(public payload: ApiError[]) {}
}

export type UserActions = LoadUsers | LoadUsersSuccess | LoadUsersFail;
