/* NgRx Store */
import { createFeatureSelector, createSelector } from '@ngrx/store';
/* maintenance State */
import { MaintenanceState } from '..';
/* maintenance Reducers */
import * as fromMaintenance from './maintenance.reducer';

/* Get all state from MaintenanceState */
export const getResourceState =
  createFeatureSelector<MaintenanceState>('maintenance');

/* Get a portion of the state (maintenance) */
export const getResourcesState = createSelector(
  getResourceState,
  (state) => state.maintenance
);
export const getResourcesError = createSelector(
  getResourceState,
  (state) => state.maintenance.error
);

export const getResources = createSelector(
  getResourcesState,
  fromMaintenance.selectAll
);


export const getResourceById = (id: string) =>
  createSelector(getResources, (resources) =>
    resources.find((resource) => resource.id.toString() === id.toString())
  );
