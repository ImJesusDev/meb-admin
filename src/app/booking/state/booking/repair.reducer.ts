// /* NgRx Entity */
// import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// /* Actions */
// import { RepairActions, RepairActionTypes } from './repair.actions';
// /* Models */
// import { Resource, ApiError } from '@models/index';

// /* Interface for the resources state */
// export interface State extends EntityState<Resource> {
//   error: ApiError[];
// }

// /* Entity adapter */
// const adapter: EntityAdapter<Resource> =
//   createEntityAdapter<Resource>();

// /* Initial client state */
// export const initialState: State = adapter.getInitialState({
//   error: [],
// });

// /* Resource reducers */
// export function reducer(state = initialState, action: RepairActions): State {
//   switch (action.type) {


//     /**
//      * Repair
//      */

//     case RepairActionTypes.CreateRepairSuccess: {
//       return adapter.addOne(action.payload, {
//         ...state,
//         error: [],
//       });
//     }

//     case RepairActionTypes.CreateRepairFail: {
//       return {
//         ...state,
//         error: action.payload,
//       };
//     }

//     case RepairActionTypes.UpdateRepairSuccess: {
//       return adapter.addOne(action.payload, {
//         ...state,
//         error: [],
//       });
//     }

//     case RepairActionTypes.UpdateRepairFail: {
//       return {
//         ...state,
//         error: action.payload,
//       };
//     }

//     case RepairActionTypes.StartRepairSuccess: {
//       return adapter.addOne(action.payload, {
//         ...state,
//         error: [],
//       });
//     }

//     case RepairActionTypes.StartRepairFail: {
//       return {
//         ...state,
//         error: action.payload,
//       };
//     }


//     default: {
//       return state;
//     }
//   }
// }
// /* Export adapter selectors */
// export const { selectIds, selectEntities, selectAll, selectTotal } =
//   adapter.getSelectors();
