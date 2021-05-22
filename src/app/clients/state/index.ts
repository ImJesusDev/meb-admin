/* NgRxStore */
import { ActionReducerMap } from '@ngrx/store';

/* Global state */
import * as fromRoot from './../../state/state';
/* Clients State */
import * as fromClients from './clients';
/* Clients Effects */
import { ClientsEffects } from './clients/clients.effects';

/* Interface for the client state */
export interface ClientState {
  clients: fromClients.State;
}

/* Interface to merge client state with global state */
export interface State extends fromRoot.State {
  client: ClientState;
}

/* Merge Reducers */
export const reducers: ActionReducerMap<ClientState, any> = {
  clients: fromClients.reducer,
};

/* Export Effects */
export const effects: any[] = [ClientsEffects];
