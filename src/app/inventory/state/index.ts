/* NgRxStore */
import { ActionReducerMap } from '@ngrx/store';
/* Global state */
import * as fromRoot from './../../state/state';
/* Inventory State */
import * as fromInventory from './inventory';
/* Inventory Effects */
import { InventoryEffects } from './inventory/inventory.effects';

/* Interface for the inventory state */
export interface InventoryState {
  inventory: fromInventory.State;
}

/* Interface to merge client state with global state */
export interface State extends fromRoot.State {
  inventory: InventoryState;
}

/* Merge Reducers */
export const reducers: ActionReducerMap<InventoryState, any> = {
  inventory: fromInventory.reducer,
};

/* Export Effects */
export const effects: any[] = [InventoryEffects];
