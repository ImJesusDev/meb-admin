/* NgRx Store */
import { createFeatureSelector, createSelector } from '@ngrx/store';
/* Users State */
import { State } from './user.reducer';
import { selectAll } from './user.reducer';

/* Get all state from UserState */
export const getUserState = createFeatureSelector<State>('users');

export const getUsers = createSelector(getUserState, selectAll);
