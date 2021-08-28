/* NgRx Entity */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
/* Actions */
import { MaintenanceActions, MaintenanceActionTypes } from './maintenance.actions';
/* Models */
import { Resource, ApiError } from '@models/index';

/* Interface for the resources state */
export interface State extends EntityState<Resource> {
  error: ApiError[];
}

/* Entity adapter */
const adapter: EntityAdapter<Resource> =
  createEntityAdapter<Resource>();

/* Initial client state */
export const initialState: State = adapter.getInitialState({
  error: [],
});

/* Resource reducers */
export function reducer(state = initialState, action: MaintenanceActions): State {
  switch (action.type) {


    /**
     * Maintenance
     */

    case MaintenanceActionTypes.CreateMaintenanceSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        error: [],
      });
    }

    case MaintenanceActionTypes.CreateMaintenanceFail: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case MaintenanceActionTypes.UpdateMaintenanceSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        error: [],
      });
    }

    case MaintenanceActionTypes.UpdateMaintenanceFail: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case MaintenanceActionTypes.StartMaintenanceSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        error: [],
      });
    }

    case MaintenanceActionTypes.StartMaintenanceFail: {
      return {
        ...state,
        error: action.payload,
      };
    }



    case MaintenanceActionTypes.LoadHistoryMaintenance: {
      return adapter.removeAll({
        ...state,
        error: [],
      });
    }
    case MaintenanceActionTypes.LoadHistoryMaintenanceSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        error: [],
      });
    }

    case MaintenanceActionTypes.LoadHistoryMaintenanceFail: {
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
