import { Action } from '@ngrx/store';
import { Client, ApiError } from '../../../models';

/* Enum to specify all clients actions */
export enum ClientsActionTypes {
  LoadClients = '[Clients] Load Clients',
  AddClient = '[Clients] Add Client',
  AddClientSuccess = '[Clients] Add Client Success',
  AddClientFail = '[Clients] Add Client Fail',
  DeleteClient = '[Clients] Delete Client',
  DeleteClientSuccess = '[Clients] Delete Client Success',
  DeleteClientFail = '[Clients] Delete Client Fail',
  LoadClientsSuccess = '[Clients] Load Clients Success',
  LoadClientsFail = '[Clients] Load Clients Fail',
}

/* Classes to implement each of the enum actions */
export class LoadClients implements Action {
  readonly type = ClientsActionTypes.LoadClients;
}
export class LoadClientsSuccess implements Action {
  readonly type = ClientsActionTypes.LoadClientsSuccess;
  constructor(public payload: Client[]) {}
}
export class AddClient implements Action {
  readonly type = ClientsActionTypes.AddClient;
  constructor(public payload: Client) {}
}
export class AddClientSuccess implements Action {
  readonly type = ClientsActionTypes.AddClientSuccess;
  constructor(public payload: Client) {}
}
export class AddClientFail implements Action {
  readonly type = ClientsActionTypes.AddClientFail;
  constructor(public payload: ApiError[]) {}
}
export class DeleteClient implements Action {
  readonly type = ClientsActionTypes.DeleteClient;
  constructor(public payload: string) {}
}
export class DeleteClientSuccess implements Action {
  readonly type = ClientsActionTypes.DeleteClientSuccess;
  constructor(public payload: string) {}
}
export class DeleteClientFail implements Action {
  readonly type = ClientsActionTypes.DeleteClientFail;
  constructor(public payload: ApiError[]) {}
}
export class LoadClientsFail implements Action {
  readonly type = ClientsActionTypes.LoadClientsFail;
  constructor(public payload: ApiError[]) {}
}

/* Export all actions */
export type ClientsActions =
  | LoadClients
  | LoadClientsSuccess
  | LoadClientsFail
  | AddClient
  | AddClientSuccess
  | AddClientFail
  | DeleteClient
  | DeleteClientSuccess
  | DeleteClientFail;
