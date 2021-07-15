/* NgRxStore */
import { ActionReducerMap } from '@ngrx/store';
/* Global state */
import * as fromRoot from './../../state/state';
/* Resources State */
import * as fromResources from './resources';
/* Resources Effects */
import { ResourcesEffects } from './resources/resources.effects';

/* Interface for the resources state */
export interface ResourcesState {
  resources: fromResources.State;
}

/* Interface to merge client state with global state */
export interface State extends fromRoot.State {
  resource: ResourcesState;
}

/* Merge Reducers */
export const reducers: ActionReducerMap<ResourcesState, any> = {
  resources: fromResources.reducer,
};

/* Export Effects */
export const effects: any[] = [ResourcesEffects];
