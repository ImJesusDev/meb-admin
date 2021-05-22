/* NgRx Store */
import { createFeatureSelector, createSelector } from '@ngrx/store';
/* Users State */
import { State } from './user.reducer';
import { selectAll } from './user.reducer';

/* Get all state from UserState */
export const getUserState = createFeatureSelector<State>('users');

export const getUsers = createSelector(getUserState, selectAll);

export const getUserLoader = createSelector(
  getUserState,
  (state: State) => state.loading
);
export const getUserErrors = createSelector(
  getUserState,
  (state: State) => state.error
);
export const getUserAdminModal = createSelector(
  getUserState,
  (state: State) => state.adminModal
);
export const getUserByEmail = (email: string) =>
  createSelector(getUsers, (users) =>
    users.find((user) => user.email === email)
  );
