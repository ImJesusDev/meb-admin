/* NgRxStore */
import { ActionReducerMap } from '@ngrx/store';
/* Global state */
import * as fromRoot from './../../state/state';
/* maintenance State */
import * as fromMaintenance from './maintenance';
/* maintenance Effects */
import { MaintenanceEffects } from './maintenance/maintenance.effects';

/* Interface for the maintenance state */
export interface MaintenanceState {
  maintenance: fromMaintenance.State;
}

/* Interface to merge resource state with global state */
export interface State extends fromRoot.State {
  maintenance: MaintenanceState;  
}

/* Merge Reducers */
export const reducers: ActionReducerMap<MaintenanceState, any> = {
  maintenance: fromMaintenance.reducer,
};

/* Export Effects */
export const effects: any[] = [MaintenanceEffects];
