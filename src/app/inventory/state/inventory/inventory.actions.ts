import { ResourceFilters } from './../../../models/inventory';
import { Action } from '@ngrx/store';
/* Models */
import { ApiError } from '@models/api-error';
import { Resource } from '@models/inventory';


/* Enum to specify all inventory actions */
export enum InventoryActionTypes {
  LoadResources = '[Inventory] Load Resources',
  LoadResourcesSuccess = '[Inventory] Load Resources Success',
  LoadResourcesFail = '[Inventory] Load Resources Fail',
  AddResource = '[Inventory] Add Resource',
  AddResourceSuccess = '[Inventory] Add Resource Success',
  AddResourceFail = '[Inventory] Add Resource Fail',
  CreateCheckup = '[Inventory] Create checkup',
  CreateCheckupSuccess = '[Inventory] Create checkup success',
  CreateCheckupFail = '[Inventory] Create checkup fail'
}

// Load Resources
export class LoadResources implements Action {
  readonly type = InventoryActionTypes.LoadResources;
  constructor(public payload?: ResourceFilters) { }
}
// Load Success
export class LoadResourcesSuccess implements Action {
  readonly type = InventoryActionTypes.LoadResourcesSuccess;
  constructor(public payload: Resource[]) { }
}
// Load Fail
export class LoadResourcesFail implements Action {
  readonly type = InventoryActionTypes.LoadResourcesFail;
  constructor(public payload: ApiError[]) { }
}

/**
 * Classes related to handle single resource
 */

// Add Resource
export class AddResource implements Action {
  readonly type = InventoryActionTypes.AddResource;
  constructor(public payload: Resource) { }
}

// Add Resource Success
export class AddResourceSuccess implements Action {
  readonly type = InventoryActionTypes.AddResourceSuccess;
  constructor(public payload: Resource) { }
}

// Add Resource Fail
export class AddResourceFail implements Action {
  readonly type = InventoryActionTypes.AddResourceFail;
  constructor(public payload: ApiError[]) { }
}


// Create checkup
export class CreateCheckup implements Action {
  readonly type = InventoryActionTypes.CreateCheckup;
  constructor(public payload: { resourceId: string }) { }
}

// Create checkup Success
export class CreateCheckupSuccess implements Action {
  readonly type = InventoryActionTypes.CreateCheckupSuccess;
  constructor(public payload: Resource) { }
}

// Create checkup Fail
export class CreateCheckupFail implements Action {
  readonly type = InventoryActionTypes.CreateCheckupFail;
  constructor(public payload: ApiError[]) { }
}


/* Export all actions */
export type InventoryActions =
  | LoadResources
  | LoadResourcesSuccess
  | LoadResourcesFail
  | AddResource
  | AddResourceSuccess
  | AddResourceFail
  | CreateCheckup
  | CreateCheckupSuccess
  | CreateCheckupFail;
