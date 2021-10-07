import { UsersService } from './../../../services/users.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
/* NgRx */
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
/* Operators */
import { switchMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';
/* Alerts */
import Swal from 'sweetalert2';
/* Services */
import { ClientsService, AuthService } from '../../../services';

/* Actions */
import {
  LoadClients,
  LoadClientsFail,
  LoadClientsSuccess,
  ClientsActionTypes,
  AddClient,
  AddClientSuccess,
  AddClientFail,
  UpdateClient,
  UpdateClientSuccess,
  UpdateClientFail,
  DeleteClient,
  DeleteClientFail,
  DeleteClientSuccess,
  AddOffice,
  AddOfficeFail,
  AddOfficeSuccess,
  AddDomains,
  AddDomainsSuccess,
  AddDomainsFail,
  AddEmails,
  AddEmailsSuccess,
  AddEmailsFail,
  DeleteOffice,
  DeleteOfficeFail,
  DeleteOfficeSuccess,
  AddUser,
  AddUserSuccess,
  AddUserFail,
  UpdateUser,
  UpdateUserSuccess,
  UpdateUserFail,
  ActiveStateUser,
  ActiveStateUserFail,
  ActiveStateUserSuccess,
} from './clients.actions';

import { StopLoader } from '../../../state/loader/loader.actions';

/* Models */
import { Client, ApiError, Office, Domain, Email } from '../../../models';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ClientsEffects {
  constructor(
    private router: Router,
    private $actions: Actions,
    private _clientsService: ClientsService,
    private _authService: AuthService,
    private _userService: UsersService,
  ) { }

  /**
   * Effect to listen for the LoadClients action
   * and make http request to load clients
   * from API
   */
  $getClients = createEffect(() => {
    return this.$actions.pipe(
      ofType(ClientsActionTypes.LoadClients),
      switchMap((action: LoadClients) =>
        this._clientsService
          .getClients()
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((clients: Client[]) => [
              new StopLoader(),
              new LoadClientsSuccess(clients),
            ]),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new LoadClientsFail(errors), new StopLoader());
            })
          )
      )
    );
  });
  /**
   * Effect to listen for the AddClient action
   * and make http request to add client
   * from API
   */
  $addClient = createEffect(() => {
    return this.$actions.pipe(
      ofType(ClientsActionTypes.AddClient),
      switchMap((action: AddClient) =>
        this._clientsService
          .addClient(action.payload)
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((client: Client) => [
              new StopLoader(),
              new AddClientSuccess(client),
            ]),
            tap(() => {
              this.router.navigate(['/clientes']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new AddClientFail(errors), new StopLoader());
            })
          )
      )
    );
  });

  /**
   * Effect to listen for the AddDomains action
   * and make http request to add domains
   * from API
   */
  $addDomains = createEffect(() => {
    return this.$actions.pipe(
      ofType(ClientsActionTypes.AddDomains),
      switchMap((action: AddDomains) =>
        this._authService
          .addDomains(action.payload)
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((domains: Domain[]) => [
              new StopLoader(),
              new AddDomainsSuccess(domains),
              new LoadClients(),
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Dominios creados!',
                showCancelButton: false,
                showDenyButton: false,
                confirmButtonText: `Aceptar`,
                confirmButtonColor: '#50b848',
                icon: 'success',
              });
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
                Swal.fire({
                  title: '¡Error creando el dominio!',
                  text: `${errors[0].message}`,
                  showCancelButton: false,
                  showDenyButton: false,
                  confirmButtonText: `Aceptar`,
                  confirmButtonColor: '#50b848',
                  icon: 'error',
                });
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new AddDomainsFail(errors), new StopLoader());
            })
          )
      )
    );
  });
  /**
   * Effect to listen for the AddDomains action
   * and make http request to add domains
   * from API
   */
  $addEmails = createEffect(() => {
    return this.$actions.pipe(
      ofType(ClientsActionTypes.AddEmails),
      switchMap((action: AddEmails) =>
        this._authService
          .addEmails(action.payload)
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((emails: Email[]) => [
              new StopLoader(),
              new AddEmailsSuccess(emails),
              new LoadClients(),
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Dominios creados!',
                showCancelButton: false,
                showDenyButton: false,
                confirmButtonText: `Aceptar`,
                confirmButtonColor: '#50b848',
                icon: 'success',
              });
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
                Swal.fire({
                  title: '¡Error creando el dominio!',
                  text: `${errors[0].message}`,
                  showCancelButton: false,
                  showDenyButton: false,
                  confirmButtonText: `Aceptar`,
                  confirmButtonColor: '#50b848',
                  icon: 'error',
                });
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new AddEmailsFail(errors), new StopLoader());
            })
          )
      )
    );
  });
  /**
   * Effect to listen for the AddOffice action
   * and make http request to add office
   * from API
   */
  $addOffice = createEffect(() => {
    return this.$actions.pipe(
      ofType(ClientsActionTypes.AddOffice),
      switchMap((action: AddOffice) =>
        this._clientsService
          .addOffice(action.payload.id, action.payload.office)
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((office: Office) => [
              new StopLoader(),
              new AddOfficeSuccess(office),
              new LoadClients(),
            ]),
            tap(() => {
              this.router.navigate(['/clientes']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new AddOfficeFail(errors), new StopLoader());
            })
          )
      )
    );
  });
  /**
   * Effect to listen for the AddClient action
   * and make http request to add client
   * from API
   */
  $updateClient = createEffect(() => {
    return this.$actions.pipe(
      ofType(ClientsActionTypes.UpdateClient),
      switchMap((action: UpdateClient) =>
        this._clientsService
          .updateClient(action.payload)
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((client: Client) => [
              new StopLoader(),
              new UpdateClientSuccess(client),
            ]),
            tap(() => {
              this.router.navigate(['/clientes']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new UpdateClientFail(errors), new StopLoader());
            })
          )
      )
    );
  });
  /**
   * Effect to listen for the Delete Client action
   * and make http request to delete a client
   * from API
   */
  $deleteClient = createEffect(() => {
    return this.$actions.pipe(
      ofType(ClientsActionTypes.DeleteClient),
      switchMap((action: DeleteClient) =>
        this._clientsService
          .deleteClient(action.payload)
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((_) => [
              new StopLoader(),
              new DeleteClientSuccess(action.payload),
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Cliente eliminado!',
                showCancelButton: false,
                showDenyButton: false,
                confirmButtonText: `Aceptar`,
                confirmButtonColor: '#50b848',
                icon: 'success',
              });
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new DeleteClientFail(errors), new StopLoader());
            })
          )
      )
    );
  });

  /**
   * Effect to listen for the Delete Office action
   * and make http request to delete an office
   * from API
   */
  $deleteOffice = createEffect(() => {
    return this.$actions.pipe(
      ofType(ClientsActionTypes.DeleteOffice),
      switchMap((action: DeleteOffice) =>
        this._clientsService
          .deleteOffice(action.payload.clientId, action.payload.officeId)
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((_) => [
              new DeleteOfficeSuccess(action.payload.officeId),
              new LoadClients(),
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Sede eliminada!',
                showCancelButton: false,
                showDenyButton: false,
                confirmButtonText: `Aceptar`,
                confirmButtonColor: '#50b848',
                icon: 'success',
              });
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new DeleteOfficeFail(errors), new StopLoader());
            })
          )
      )
    );
  });

  /**
   * Effect to listen for the Add user action
   * and make http request to add user
   * from API
   */
  $addUser = createEffect(() => {
    return this.$actions.pipe(
      ofType(ClientsActionTypes.AddUser),
      switchMap((action: AddUser) =>
        this._userService
          .addUser(action.payload)
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((_) => [
              new AddUserSuccess(action.payload)
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Usuario agregado!',
                showCancelButton: false,
                showDenyButton: false,
                confirmButtonText: `Aceptar`,
                confirmButtonColor: '#50b848',
                icon: 'success',
              });
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
                Swal.fire({
                  title: '¡Error creando el usuario!',
                  text: `${errors[0].message}`,
                  showCancelButton: false,
                  showDenyButton: false,
                  confirmButtonText: `Aceptar`,
                  confirmButtonColor: '#50b848',
                  icon: 'error',
                });
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new DeleteOfficeFail(errors), new StopLoader());
            })
          )
      )
    );
  });


  /**
   * Effect to listen for the Add user action
   * and make http request to add user
   * from API
   */
   $updateUser = createEffect(() => {
    return this.$actions.pipe(
      ofType(ClientsActionTypes.UpdateUser),
      switchMap((action: AddUser) =>
        this._userService
          .updateUser(action.payload)
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((_) => [
              new UpdateUserSuccess(action.payload)
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Usuario Actualizado!',
                showCancelButton: false,
                showDenyButton: false,
                confirmButtonText: `Aceptar`,
                confirmButtonColor: '#50b848',
                icon: 'success',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  this.router.navigate(['/clientes/']);
                } 
              });
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
                Swal.fire({
                  title: '¡Error actualizando el usuario!',
                  text: `${errors[0].message}`,
                  showCancelButton: false,
                  showDenyButton: false,
                  confirmButtonText: `Aceptar`,
                  confirmButtonColor: '#50b848',
                  icon: 'error',
                });
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new DeleteOfficeFail(errors), new StopLoader());
            })
          )
      )
    );
  });


  $activeStateUser = createEffect(() => {
    return this.$actions.pipe(
      ofType(ClientsActionTypes.ActiveStateUser),
      switchMap((action: ActiveStateUser) =>
        this._userService
          .activeStateUser(action.payload)
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((_) => [
              new ActiveStateUserSuccess(action.payload)
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Se ha inactivado!',
                showCancelButton: false,
                showDenyButton: false,
                confirmButtonText: `Aceptar`,
                confirmButtonColor: '#50b848',
                icon: 'success',
              });
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
                Swal.fire({
                  title: '¡Error actualizando los usuarios!',
                  text: `${errors[0].message}`,
                  showCancelButton: false,
                  showDenyButton: false,
                  confirmButtonText: `Aceptar`,
                  confirmButtonColor: '#50b848',
                  icon: 'error',
                });
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new ActiveStateUserFail(errors), new StopLoader());
            })
          )
      )
    );
  });


  

}
