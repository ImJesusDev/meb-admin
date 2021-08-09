/* NgRx Store */
import { createFeatureSelector, createSelector } from '@ngrx/store';
/* Inventory State */
import { InventoryState } from '..';
/* Inventory Reducers */
import * as fromInventory from './inventory.reducer';

/* Get all state from InventoryState */
export const getResourceState =
  createFeatureSelector<InventoryState>('inventory');

/* Get a portion of the state (inventory) */
export const getResourcesState = createSelector(
  getResourceState,
  (state) => state.inventory
);
export const getResourcesError = createSelector(
  getResourceState,
  (state) => state.inventory.error
);

export const getResources = createSelector(
  getResourcesState,
  fromInventory.selectAll
);


export const getResourceById = (id: string) =>
  createSelector(getResources, (resources) =>
    resources.find((resource) => resource.id.toString() === id.toString())
  );
