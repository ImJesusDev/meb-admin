/* NgRx Entity */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
/* Actions */
import { UserActions, UserActionTypes } from '../users/user.actions';
/* Models */
import { User } from '../../models';

/* Interface for the clients state */
export interface State extends EntityState<User> {
  error: any;
}

/* Entity adapter */
const adapter: EntityAdapter<User> = createEntityAdapter<User>();

/* Initial client state */
export const initialState: State = adapter.getInitialState({
  error: null,
});

/* Client reducers */
export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case UserActionTypes.LoadUsers: {
      return adapter.removeAll({
        ...state,
        error: null,
      });
    }

    case UserActionTypes.LoadUsersSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        error: null,
      });
    }

    case UserActionTypes.LoadUsersFail: {
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
