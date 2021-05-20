import * as loaderState from './loader/loader.reducer';
import * as authState from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';

export interface State {
  spinner: loaderState.State;
  auth: authState.State;
}
/* Export Effects */
export const effects: any[] = [AuthEffects];
