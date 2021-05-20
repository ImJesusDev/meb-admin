import { Injectable } from '@angular/core';
/* NgRx */
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
/* Operators */
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

/* Services */
import { ClientsService } from '../../../services';

/* Actions */
import {
  LoadClients,
  LoadClientsFail,
  LoadClientsSuccess,
  ClientsActionTypes,
} from './clients.actions';

import { StopLoader } from '../../../state/loader/loader.actions';

/* Models */
import { Client } from '../../../models';

@Injectable()
export class ClientsEffects {
  constructor(
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
            catchError((error) => of(new LoadClientsFail(error)))
          )
      )
    );
  });
}
