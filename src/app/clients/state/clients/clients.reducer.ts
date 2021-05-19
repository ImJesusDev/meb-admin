/* NgRx Entity */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
/* Actions */
import { ClientsActionTypes, ClientsActions } from '../clients/clients.actions';
/* Models */
import { Client } from '../../../models';

/* Interface for the clients state */
export interface State extends EntityState<Client> {
  error: any;
}

/* Entity adapter */
const adapter: EntityAdapter<Client> = createEntityAdapter<Client>();

/* Initial client state */
export const initialState: State = adapter.getInitialState({
  error: null,
});

/* Client reducers */
export function reducer(state = initialState, action: ClientsActions): State {
  switch (action.type) {
    case ClientsActionTypes.LoadClients: {
      return adapter.removeAll({
        ...state,
        error: null,
      });
    }

    case ClientsActionTypes.LoadClientsSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        error: null,
      });
    }

    case ClientsActionTypes.LoadClientsFail: {
      return adapter.removeAll({
        ...state,
        error: action.payload,
      });
    }
    default: {
      return state;
    }
  }
}

/* Export adapter selectors */
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
