/* NgRx Entity */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
/* Actions */
import { ClientsActionTypes, ClientsActions } from '../clients/clients.actions';
/* Models */
import { Client, ApiError } from '../../../models';

/* Interface for the clients state */
export interface State extends EntityState<Client> {
  error: ApiError[];
}

/* Entity adapter */
const adapter: EntityAdapter<Client> = createEntityAdapter<Client>();

/* Initial client state */
export const initialState: State = adapter.getInitialState({
  error: [],
});

/* Client reducers */
export function reducer(state = initialState, action: ClientsActions): State {
  switch (action.type) {
    case ClientsActionTypes.LoadClients: {
      return adapter.removeAll({
        ...state,
        error: [],
      });
    }

    case ClientsActionTypes.LoadClientsSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        error: [],
      });
    }

    case ClientsActionTypes.LoadClientsFail: {
      return adapter.removeAll({
        ...state,
        error: action.payload,
      });
    }

    case ClientsActionTypes.AddClientSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        error: [],
      });
    }

    case ClientsActionTypes.AddClientFail: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ClientsActionTypes.DeleteClientSuccess: {
      return adapter.removeOne(action.payload, {
        ...state,
        error: [],
      });
    }
    case ClientsActionTypes.DeleteClientFail: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

/* Export adapter selectors */
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
