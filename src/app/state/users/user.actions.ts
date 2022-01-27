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
  LoadCountries = '[Users] Load Countries',
  LoadCountriesSuccess = '[Users] Load Countries Success',
  LoadCountriesFail = '[Users] Load Countries Fail',
  LoadEps = '[Users] Load Eps',
  LoadEpsSuccess = '[Users] Load Eps Success',
  LoadEpsFail = '[Users] Load Eps Fail',
  LoadTransportMethods = '[Users] Load TransportMethods',
  LoadTransportMethodsSuccess = '[Users] Load TransportMethods Success',
  LoadTransportMethodsFail = '[Users] Load TransportMethods Fail',
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

export class LoadCountries implements Action {
  readonly type = UserActionTypes.LoadCountries;
}
export class LoadCountriesSuccess implements Action {
  readonly type = UserActionTypes.LoadCountriesSuccess;
  constructor(public payload: any[]) {}
}
export class LoadCountriesFail implements Action {
  readonly type = UserActionTypes.LoadCountriesFail;
  constructor(public payload: ApiError[]) {}
}

export class LoadEps implements Action {
  readonly type = UserActionTypes.LoadEps;
}
export class LoadEpsSuccess implements Action {
  readonly type = UserActionTypes.LoadEpsSuccess;
  constructor(public payload: any[]) {}
}
export class LoadEpsFail implements Action {
  readonly type = UserActionTypes.LoadEpsFail;
  constructor(public payload: ApiError[]) {}
}

export class LoadTransportMethods implements Action {
  readonly type = UserActionTypes.LoadTransportMethods;
}
export class LoadTransportMethodsSuccess implements Action {
  readonly type = UserActionTypes.LoadTransportMethodsSuccess;
  constructor(public payload: any[]) {}
}
export class LoadTransportMethodsFail implements Action {
  readonly type = UserActionTypes.LoadTransportMethodsFail;
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
  | AddAdminFail
  | LoadCountries
  | LoadCountriesSuccess
  | LoadCountriesFail
  | LoadEps
  | LoadEpsSuccess
  | LoadEpsFail
  | LoadTransportMethods
  | LoadTransportMethodsSuccess
  | LoadTransportMethodsFail;
  