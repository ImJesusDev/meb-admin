/* NgRx Store */
import { createFeatureSelector, createSelector } from '@ngrx/store';
/* Users State */
import { State } from '../state';
/* Users Reducers */
import * as fromUsers from '../users/user.reducer';

/* Get all state from UserState */
export const getUserState = createFeatureSelector<State>('users');

/* Get a portion of the state (clients) */
export const getUsersState = createSelector(
  getUserState,
  (state) => state.users
);

export const getUsers = createSelector(getUsersState, fromUsers.selectAll);
