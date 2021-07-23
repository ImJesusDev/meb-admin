/* NgRx Entity */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
/* Actions */
import { ResourcesActions, ResourcesActionTypes } from './resources.actions';
/* Models */
import { ResourceType, ApiError } from 'src/app/models';

/* Interface for the resources state */
export interface State extends EntityState<ResourceType> {
  error: ApiError[];
}

/* Entity adapter */
const adapter: EntityAdapter<ResourceType> =
  createEntityAdapter<ResourceType>();

/* Initial client state */
export const initialState: State = adapter.getInitialState({
  error: [],
});

/* Resource reducers */
export function reducer(state = initialState, action: ResourcesActions): State {
  switch (action.type) {
    case ResourcesActionTypes.LoadResources: {
      return adapter.removeAll({
        ...state,
        error: [],
      });
    }
    case ResourcesActionTypes.LoadResourcesSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        error: [],
      });
    }
    case ResourcesActionTypes.LoadResourcesFail: {
      return adapter.removeAll({
        ...state,
        error: action.payload,
      });
    }

    case ResourcesActionTypes.AddResourceSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        error: [],
      });
    }

    case ResourcesActionTypes.AddResourceFail: {
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
