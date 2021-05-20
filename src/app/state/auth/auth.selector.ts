import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './auth.reducer';

export const getAuthState = createFeatureSelector<State>('auth');

export const getAuth = createSelector(
  getAuthState,
  (state: State) => state.isLogged
);
