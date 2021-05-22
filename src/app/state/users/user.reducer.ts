/* NgRx Entity */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
/* Actions */
import { UserActions, UserActionTypes } from '../users/user.actions';
/* Models */
import { User, ApiError } from '../../models';

/* Interface for the clients state */
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

/* Client reducers */
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
    default: {
      return state;
    }
  }
}

/* Export adapter selectors */
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
