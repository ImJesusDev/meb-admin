import { Action } from '@ngrx/store';
import { User, ApiError } from '../../models';

export enum UserActionTypes {
  LoadUsers = '[Users] Load Users',
  LoadUsersSuccess = '[Users] Load Users Success',
  LoadUsersFail = '[Users] Load Users Fail',
  AddAdminStart = '[Users] Add Admin',
  AddAdminSuccess = '[Users] Add Success',
  AddAdminFail = '[Users] Add Fail',
  AddAdminCancel = '[Users] Add Cancel',
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;
}
export class AddAdminCancel implements Action {
  readonly type = UserActionTypes.AddAdminCancel;
}
export class AddAdminStart implements Action {
  readonly type = UserActionTypes.AddAdminStart;
  constructor(public payload: User) {}
}
export class AddAdminSuccess implements Action {
  readonly type = UserActionTypes.AddAdminSuccess;
  constructor(public payload: User) {}
}
export class AddAdminFail implements Action {
  readonly type = UserActionTypes.AddAdminFail;
  constructor(public payload: ApiError[]) {}
}
export class LoadUsersSuccess implements Action {
  readonly type = UserActionTypes.LoadUsersSuccess;
  constructor(public payload: User[]) {}
}
export class LoadUsersFail implements Action {
  readonly type = UserActionTypes.LoadUsersFail;
  constructor(public payload: ApiError[]) {}
}

export type UserActions =
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersFail
  | AddAdminStart
  | AddAdminSuccess
  | AddAdminCancel
  | AddAdminFail;
