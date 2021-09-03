import { User } from 'src/app/models';
import { Action } from '@ngrx/store';
import { Client, ApiError, Office, Domain, Email } from '../../../models';

/* Enum to specify all clients actions */
export enum ClientsActionTypes {
  LoadClients = '[Clients] Load Clients',
  AddClient = '[Clients] Add Client',
  AddClientSuccess = '[Clients] Add Client Success',
  AddClientFail = '[Clients] Add Client Fail',
  AddOffice = '[Clients] Add Office',
  AddOfficeSuccess = '[Clients] Add Office Success',
  AddOfficeFail = '[Clients] Add Office Fail',
  AddDomains = '[Clients] Add Domains',
  AddDomainsSuccess = '[Clients] Add Domains Success',
  AddDomainsFail = '[Clients] Add Domains Fail',
  AddEmails = '[Clients] Add Emails',
  AddEmailsSuccess = '[Clients] Add Emails Success',
  AddEmailsFail = '[Clients] Add Emails Fail',
  UpdateClient = '[Clients] Update Client',
  UpdateClientSuccess = '[Clients] Update Client Success',
  UpdateClientFail = '[Clients] Update Client Fail',
  DeleteClient = '[Clients] Delete Client',
  DeleteClientSuccess = '[Clients] Delete Client Success',
  DeleteClientFail = '[Clients] Delete Client Fail',
  DeleteOffice = '[Clients] Delete Office',
  DeleteOfficeSuccess = '[Clients] Delete Office Success',
  DeleteOfficeFail = '[Clients] Delete Office Fail',
  LoadClientsSuccess = '[Clients] Load Clients Success',
  LoadClientsFail = '[Clients] Load Clients Fail',
  AddUser = '[Clients] Add User',
  AddUserSuccess = '[Clients] Add User Success',
  AddUserFail = '[Clients] Add User Fail',
}

/**
 * Classes related to load all clientes
 */

// Load Clients
export class LoadClients implements Action {
  readonly type = ClientsActionTypes.LoadClients;
}
// Load Success
export class LoadClientsSuccess implements Action {
  readonly type = ClientsActionTypes.LoadClientsSuccess;
  constructor(public payload: Client[]) { }
}
// Load Fail
export class LoadClientsFail implements Action {
  readonly type = ClientsActionTypes.LoadClientsFail;
  constructor(public payload: ApiError[]) { }
}

/**
 * Classes related to handle single client
 */

// Add Client
export class AddClient implements Action {
  readonly type = ClientsActionTypes.AddClient;
  constructor(public payload: Client) { }
}

// Add Client Success
export class AddClientSuccess implements Action {
  readonly type = ClientsActionTypes.AddClientSuccess;
  constructor(public payload: Client) { }
}

// Add Client Fail
export class AddClientFail implements Action {
  readonly type = ClientsActionTypes.AddClientFail;
  constructor(public payload: ApiError[]) { }
}

// Add Office
export class AddOffice implements Action {
  readonly type = ClientsActionTypes.AddOffice;
  constructor(public payload: { id: string; office: Office }) { }
}

// Add Office Success
export class AddOfficeSuccess implements Action {
  readonly type = ClientsActionTypes.AddOfficeSuccess;
  constructor(public payload: Office) { }
}

// Add Office Fail
export class AddOfficeFail implements Action {
  readonly type = ClientsActionTypes.AddOfficeFail;
  constructor(public payload: ApiError[]) { }
}
// Add Domains
export class AddDomains implements Action {
  readonly type = ClientsActionTypes.AddDomains;
  constructor(public payload: { domains: Domain[] }) { }
}

// Add Domains Success
export class AddDomainsSuccess implements Action {
  readonly type = ClientsActionTypes.AddDomainsSuccess;
  constructor(public payload: Domain[]) { }
}

// Add Domains Fail
export class AddDomainsFail implements Action {
  readonly type = ClientsActionTypes.AddDomainsFail;
  constructor(public payload: ApiError[]) { }
}
// Add Emails
export class AddEmails implements Action {
  readonly type = ClientsActionTypes.AddEmails;
  constructor(public payload: { emails: Email[] }) { }
}

// Add Emails Success
export class AddEmailsSuccess implements Action {
  readonly type = ClientsActionTypes.AddEmailsSuccess;
  constructor(public payload: Email[]) { }
}

// Add Emails Fail
export class AddEmailsFail implements Action {
  readonly type = ClientsActionTypes.AddEmailsFail;
  constructor(public payload: ApiError[]) { }
}

// Update Client
export class UpdateClient implements Action {
  readonly type = ClientsActionTypes.UpdateClient;
  constructor(public payload: Client) { }
}

// Ad Client Success
export class UpdateClientSuccess implements Action {
  readonly type = ClientsActionTypes.UpdateClientSuccess;
  constructor(public payload: Client) { }
}

// Update Client Fail
export class UpdateClientFail implements Action {
  readonly type = ClientsActionTypes.UpdateClientFail;
  constructor(public payload: ApiError[]) { }
}

// Delete Client
export class DeleteClient implements Action {
  readonly type = ClientsActionTypes.DeleteClient;
  constructor(public payload: string) { }
}

// Delete Success
export class DeleteClientSuccess implements Action {
  readonly type = ClientsActionTypes.DeleteClientSuccess;
  constructor(public payload: string) { }
}

// Delete  Fail
export class DeleteClientFail implements Action {
  readonly type = ClientsActionTypes.DeleteClientFail;
  constructor(public payload: ApiError[]) { }
}
// Delete Office
export class DeleteOffice implements Action {
  readonly type = ClientsActionTypes.DeleteOffice;
  constructor(public payload: { clientId: string; officeId: string }) { }
}

// Delete Office Success
export class DeleteOfficeSuccess implements Action {
  readonly type = ClientsActionTypes.DeleteOfficeSuccess;
  constructor(public payload: string) { }
}

// Delete Office Fail
export class DeleteOfficeFail implements Action {
  readonly type = ClientsActionTypes.DeleteOfficeFail;
  constructor(public payload: ApiError[]) { }
}

// Load Clients
export class AddUser implements Action {
  readonly type = ClientsActionTypes.AddUser;
  constructor(public payload: User) { }
}
// Load Success
export class AddUserSuccess implements Action {
  readonly type = ClientsActionTypes.AddUserSuccess;
  constructor(public payload: User) { }
}
// Load Fail
export class AddUserFail implements Action {
  readonly type = ClientsActionTypes.AddUserFail;
  constructor(public payload: ApiError[]) { }
}

/* Export all actions */
export type ClientsActions =
  | LoadClients
  | LoadClientsSuccess
  | LoadClientsFail
  | AddClient
  | AddClientSuccess
  | AddClientFail
  | AddOffice
  | AddOfficeSuccess
  | AddOfficeFail
  | AddDomains
  | AddDomainsSuccess
  | AddDomainsFail
  | AddEmails
  | AddEmailsSuccess
  | AddEmailsFail
  | UpdateClient
  | UpdateClientSuccess
  | UpdateClientFail
  | DeleteClient
  | DeleteClientSuccess
  | DeleteClientFail
  | AddUser
  | AddUserSuccess
  | AddUserFail;
