import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './loader.reducer';

export const getLoaderState = createFeatureSelector<State>('loader');

export const getLoader = createSelector(
  getLoaderState,
  (state: State) => state.isOn
);
