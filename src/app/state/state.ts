import * as loaderState from './loader/loader.reducer';
import * as authState from './auth/auth.reducer';
import * as usersState from './users/user.reducer';
import { AuthEffects } from './auth/auth.effects';
import { UsersEffects } from './users/users.effects';

export interface State {
  spinner: loaderState.State;
  auth: authState.State;
  users: usersState.State;
}
/* Export Effects */
export const effects: any[] = [AuthEffects, UsersEffects];
