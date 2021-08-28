/* NgRxStore */
import { ActionReducerMap } from '@ngrx/store';
/* Global state */
import * as fromRoot from './../../state/state';
/* repair State */
import * as fromRepair from './repair';
/* repair Effects */
import { RepairEffects } from './repair/repair.effects';

/* Interface for the repair state */
export interface RepairState {
  repair: fromRepair.State;
}

/* Interface to merge resource state with global state */
export interface State extends fromRoot.State {
  repair: RepairState;  
}

/* Merge Reducers */
export const reducers: ActionReducerMap<RepairState, any> = {
  repair: fromRepair.reducer,
};

/* Export Effects */
export const effects: any[] = [RepairEffects];
