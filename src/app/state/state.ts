import * as loaderState from './loader/loader.reducer';
import * as authState from './auth/auth.reducer';
import * as usersState from './users/user.reducer';
import * as locationsState from './locations/locations.reducer';

import { AuthEffects } from './auth/auth.effects';
import { UsersEffects } from './users/users.effects';
import { LocationsEffects } from './locations/locations.effects';

export interface State {
  spinner: loaderState.State;
  auth: authState.State;
  users: usersState.State;
  locations: locationsState.State;
}
/* Export Effects */
export const effects: any[] = [AuthEffects, UsersEffects, LocationsEffects];
