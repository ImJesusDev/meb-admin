/* NgRx Entity */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
/* Actions */
import { UserActionTypes } from './user.actions';
/* Models */
import { User, ApiError } from '../../models';

/* Interface for the users state */
export interface State extends EntityState<User> {
  error: ApiError[];
  loading: boolean;
  adminModal: boolean;
}

/* Entity adapter */
const adapter: EntityAdapter<User> = createEntityAdapter<User>();

/* Initial client state */
export const initialState: State = adapter.getInitialState({
  error: [],
  loading: false,
  adminModal: false,
});

/* Users reducers */
export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case UserActionTypes.LoadUsers: {
      return adapter.removeAll({
        ...state,
        loading: true,
        error: [],
      });
    }
    case UserActionTypes.AddAdminStart: {
      return {
        ...state,
        loading: true,
        adminModal: true,
        error: [],
      };
    }
    case UserActionTypes.AddAdminSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        loading: false,
        adminModal: false,
        error: [],
      });
    }
    case UserActionTypes.AddAdminFail: {
      return {
        ...state,
        loading: false,
        adminModal: true,
        error: action.payload,
      };
    }
    case UserActionTypes.AddAdminCancel: {
      return {
        ...state,
        loading: false,
        adminModal: false,
      };
    }
    case UserActionTypes.LoadUsersSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        loading: false,
        adminModal: false,
        error: [],
      });
    }

    case UserActionTypes.LoadUsersFail: {
      return adapter.removeAll({
        ...state,
        loading: false,
        error: action.payload,
      });
    }

    case UserActionTypes.LoadTeam: {
      return adapter.removeAll({
        ...state,
        loading: true,
        error: [],
      });
    }
    case UserActionTypes.LoadTeamSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        loading: false,
        error: [],
      });
    }
    case UserActionTypes.LoadTeamFail: {
      return adapter.removeAll({
        ...state,
        loading: false,
        error: action.payload,
      });
    }

    case UserActionTypes.LoadEps: {
      return adapter.removeAll({
        ...state,
        loading: true,
        error: [],
      });
    }
    case UserActionTypes.LoadEpsSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        loading: false,
        error: [],
      });
    }
    case UserActionTypes.LoadEpsFail: {
      return adapter.removeAll({
        ...state,
        loading: false,
        error: action.payload,
      });
    }
    case UserActionTypes.LoadCountries: {
      return adapter.removeAll({
        ...state,
        loading: true,
        error: [],
      });
    }
    case UserActionTypes.LoadCountriesSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        loading: false,
        error: [],
      });
    }
    case UserActionTypes.LoadCountriesFail: {
      return adapter.removeAll({
        ...state,
        loading: false,
        error: action.payload,
      });
    }
    case UserActionTypes.LoadTransportMethods: {
      return adapter.removeAll({
        ...state,
        loading: true,
        error: [],
      });
    }
    case UserActionTypes.LoadTransportMethodsSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        loading: false,
        error: [],
      });
    }
    case UserActionTypes.LoadTransportMethodsFail: {
      return adapter.removeAll({
        ...state,
        loading: false,
        error: action.payload,
      });
    }

    case UserActionTypes.LoadClientAdmin: {
      return adapter.removeAll({
        ...state,
        loading: true,
        error: [],
      });
    }
    case UserActionTypes.LoadClientAdminSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        loading: false,
        error: [],
      });
    }

    case UserActionTypes.LoadClientAdminFail: {
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
