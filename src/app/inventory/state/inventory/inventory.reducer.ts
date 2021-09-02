/* NgRx Entity */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
/* Actions */
import { InventoryActions, InventoryActionTypes } from './inventory.actions';
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
export function reducer(state = initialState, action: InventoryActions): State {
  switch (action.type) {

    case InventoryActionTypes.LoadResources: {
      return adapter.removeAll({
        ...state,
        error: [],
      });
    }
    case InventoryActionTypes.LoadResourcesSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        error: [],
      });
    }
    case InventoryActionTypes.LoadResourcesFail: {
      return adapter.removeAll({
        ...state,
        error: action.payload,
      });
    }

    case InventoryActionTypes.AddResourceSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        error: [],
      });
    }


    case InventoryActionTypes.UpdateResourceSuccess: {
      return adapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        {
          ...state,
          error: [],
        }
      );
    }


    case InventoryActionTypes.AddResourceFail: {
      return {
        ...state,
        error: action.payload,
      };
    }


    case InventoryActionTypes.ChangeLockerPassSuccess: {
      return adapter.updateMany(
        action.payload.map((category) => Object.assign({ }, { id: category.id, changes: category })),
        {
          ...state,
          error: [],
        });
    }
    case InventoryActionTypes.ChangeLockerPassFail: {
      return {
        ...state,
        error: action.payload,
      };
    }


    /**
     * Checkups
     */

    case InventoryActionTypes.CreateCheckupSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        error: [],
      });
    }

    case InventoryActionTypes.CreateCheckupFail: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case InventoryActionTypes.CreateCheckupsSuccess: {
      return adapter.updateMany(
        action.payload.map((category) => Object.assign({ }, { id: category.id, changes: category })),
        {
          ...state,
          error: [],
        });
    }

    case InventoryActionTypes.CreateCheckupsFail: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case InventoryActionTypes.UpdateCheckupSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        error: [],
      });
    }

    case InventoryActionTypes.UpdateCheckupFail: {
      return {
        ...state,
        error: action.payload,
      };
    }


    /**
     * Approve
     */

    case InventoryActionTypes.ApproveSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        error: [],
      });
    }

    case InventoryActionTypes.ApproveFail: {
      return {
        ...state,
        error: action.payload,
      };
    }


    case InventoryActionTypes.ApproveRepairSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        error: [],
      });
    }

    case InventoryActionTypes.ApproveRepairFail: {
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
