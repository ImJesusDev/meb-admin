/* NgRx Store */
import { createFeatureSelector, createSelector } from '@ngrx/store';
/* Clients State */
import { ClientState } from '..';
/* Clients Reducers */
import * as fromClients from './../clients/clients.reducer';

/* Get all state from ClientState */
export const getClientState = createFeatureSelector<ClientState>('clients');

/* Get a portion of the state (clients) */
export const getClientsState = createSelector(
  getClientState,
  (state) => state.clients
);
export const getClientsError = createSelector(
  getClientState,
  (state) => state.clients.error
);

export const getClients = createSelector(
  getClientsState,
  fromClients.selectAll
);
