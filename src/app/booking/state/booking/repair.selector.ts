// /* NgRx Store */
// import { createFeatureSelector, createSelector } from '@ngrx/store';
// /* repair State */
// import { RepairState } from '..';
// /* repair Reducers */
// import * as fromRepair from './repair.reducer';

// /* Get all state from RepairState */
// export const getResourceState =
//   createFeatureSelector<RepairState>('repair');

// /* Get a portion of the state (repair) */
// export const getResourcesState = createSelector(
//   getResourceState,
//   (state) => state.repair
// );
// export const getResourcesError = createSelector(
//   getResourceState,
//   (state) => state.repair.error
// );

// export const getResources = createSelector(
//   getResourcesState,
//   fromRepair.selectAll
// );


// export const getResourceById = (id: string) =>
//   createSelector(getResources, (resources) =>
//     resources.find((resource) => resource.id.toString() === id.toString())
//   );
