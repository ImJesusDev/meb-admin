/* NgRx Entity */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
/* Actions */
import { LocationActionTypes } from './locations.actions';
/* Models */
import { Country, ApiError } from '../../models';

/* Interface for the locations state */
export interface State extends EntityState<Country> {
  error: ApiError[];
  loading: boolean;
}

/* Entity adapter */
const adapter: EntityAdapter<Country> = createEntityAdapter<Country>();

/* Initial client state */
export const initialState: State = adapter.getInitialState({
  error: [],
  loading: false,
});

/* Locations reducers */
export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case LocationActionTypes.LoadCountries: {
      return adapter.removeAll({
        ...state,
        loading: true,
        error: [],
      });
    }

    case LocationActionTypes.LoadCountriesSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        loading: false,
        error: [],
      });
    }

    case LocationActionTypes.LoadCountriesFail: {
      return adapter.removeAll({
        ...state,
        loading: false,
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
