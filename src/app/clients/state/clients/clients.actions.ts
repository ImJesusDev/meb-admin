import { Action } from '@ngrx/store';
import { Client } from '../../../models';

/* Enum to specify all clients actions */
export enum ClientsActionTypes {
  LoadClients = '[Clients] Load Clients',
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
export class LoadClientsFail implements Action {
  readonly type = ClientsActionTypes.LoadClientsFail;
  constructor(public payload: any) {}
}

/* Export all actions */
export type ClientsActions = LoadClients | LoadClientsSuccess | LoadClientsFail;
