import { Action } from '@ngrx/store';

/* Models */
import { Login } from '../../models';
export enum AuthActionTypes {
  LoginStart = '[Auth] Login Start',
  LoginSuccess = '[Auth] Login Success',
  LoginFail = '[Auth] Login Fail',
  LogOut = '[Auth] Log Out',
  SetAuth = '[Auth] Set Auth',
}

export class LoginStart implements Action {
  readonly type = AuthActionTypes.LoginStart;
  constructor(public payload: Login) {}
}
export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  // constructor(public payload: any) {}
}
export class SetAuth implements Action {
  readonly type = AuthActionTypes.SetAuth;
  // constructor(public payload: any) {}
}
export class LoginFail implements Action {
  readonly type = AuthActionTypes.LoginFail;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LogOut;
}

export type AuthActions =
  | LogOut
  | LoginStart
  | LoginSuccess
  | LoginFail
  | SetAuth;
