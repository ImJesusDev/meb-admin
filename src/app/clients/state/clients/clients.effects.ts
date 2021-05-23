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
import { ClientsService } from '../../../services';

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
} from './clients.actions';

import { StopLoader } from '../../../state/loader/loader.actions';

/* Models */
import { Client, ApiError } from '../../../models';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ClientsEffects {
  constructor(
    private router: Router,
    private $actions: Actions,
    private _clientsService: ClientsService
  ) {}

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
   * Effect to listen for the AddClient action
   * and make http request to add client
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
              return of(new AddClientFail(errors), new StopLoader());
            })
          )
      )
    );
  });
}
