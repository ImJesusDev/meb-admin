/* NgRx Store */
import { createFeatureSelector, createSelector } from '@ngrx/store';
/* Locations State */
import { State, selectAll } from './locations.reducer';

/* Get all state from Locations */
export const getLocationsState = createFeatureSelector<State>('locations');

export const getCountries = createSelector(getLocationsState, selectAll);
