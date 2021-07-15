/* NgRx Store */
import { createFeatureSelector, createSelector } from '@ngrx/store';
/* Resources State */
import { ResourcesState } from '..';
/* Resources Reducers */
import * as fromResources from './../resources/resources.reducer';

/* Get all state from ResourcesState */
export const getResourceState =
  createFeatureSelector<ResourcesState>('resources');

/* Get a portion of the state (resources) */
export const getResourcesState = createSelector(
  getResourceState,
  (state) => state.resources
);
export const getResourcesError = createSelector(
  getResourceState,
  (state) => state.resources.error
);

export const getResources = createSelector(
  getResourcesState,
  fromResources.selectAll
);
