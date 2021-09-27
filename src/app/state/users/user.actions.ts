import { Action } from '@ngrx/store';
import { User, ApiError } from '../../models';

export enum UserActionTypes {
  LoadUsers = '[Users] Load Users',
  LoadUsersSuccess = '[Users] Load Users Success',
  LoadUsersFail = '[Users] Load Users Fail',
  LoadTeam = '[Users] Load Team',
  LoadTeamSuccess = '[Users] Load Team Success',
  LoadTeamFail = '[Users] Load Team Fail',
  LoadClientAdmin = '[Users] Load ClientAdmin',
  LoadClientAdminSuccess = '[Users] Load ClientAdmin Success',
  LoadClientAdminFail = '[Users] Load ClientAdmin Fail',
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

export class LoadTeam implements Action {
  readonly type = UserActionTypes.LoadTeam;
}
export class LoadTeamSuccess implements Action {
  readonly type = UserActionTypes.LoadTeamSuccess;
  constructor(public payload: User[]) {}
}
export class LoadTeamFail implements Action {
  readonly type = UserActionTypes.LoadTeamFail;
  constructor(public payload: ApiError[]) {}
}
export class LoadClientAdmin implements Action {
  readonly type = UserActionTypes.LoadClientAdmin;
}
export class LoadClientAdminSuccess implements Action {
  readonly type = UserActionTypes.LoadClientAdminSuccess;
  constructor(public payload: User[]) {}
}
export class LoadClientAdminFail implements Action {
  readonly type = UserActionTypes.LoadClientAdminFail;
  constructor(public payload: ApiError[]) {}
}
export type UserActions =
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersFail
  | LoadTeam
  | LoadTeamSuccess
  | LoadTeamFail
  | LoadClientAdmin
  | LoadClientAdminSuccess
  | LoadClientAdminFail
  | AddAdminStart
  | AddAdminSuccess
  | AddAdminCancel
  | AddAdminFail;
