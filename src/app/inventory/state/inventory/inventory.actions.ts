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
  UpdateResource = '[Inventory] Update resource',
  UpdateResourceSuccess = '[Inventory] Update resource success',
  UpdateResourceFail = '[Inventory] Update resource fail',
  CreateCheckup = '[Inventory] Create checkup',
  CreateCheckupSuccess = '[Inventory] Create checkup success',
  CreateCheckupFail = '[Inventory] Create checkup fail',
  CreateCheckups = '[Inventory] Create checkups',
  CreateCheckupsSuccess = '[Inventory] Create checkups success',
  CreateCheckupsFail = '[Inventory] Create checkups fail',
  UpdateCheckup = '[Inventory] Update checkup',
  UpdateCheckupSuccess = '[Inventory] Update checkup success',
  UpdateCheckupFail = '[Inventory] Update checkup fail',
  Approve = '[Inventory] Approve',
  ApproveSuccess = '[Inventory] Approve success',
  ApproveFail = '[Inventory] Approve fail',
  ApproveRepair = '[Inventory] Approve repair',
  ApproveRepairSuccess = '[Inventory] Approve repair success',
  ApproveRepairFail = '[Inventory] Approve repair fail',
  LoadHistoryMaintenance = '[Maintenance] Load history maintenance',
  LoadHistoryMaintenanceSuccess = '[Maintenance] Load history maintenance success',
  LoadHistoryMaintenanceFail = '[Maintenance] Load history maintenance fail',
}

// Load Resources
export class LoadResources implements Action {
  readonly type = InventoryActionTypes.LoadResources;
  constructor(public payload?: ResourceFilters) { }
}
// Load Success
export class LoadResourcesSuccess implements Action {
  readonly type = InventoryActionTypes.LoadResourcesSuccess;
  constructor(public payload: Resource[], public page: number, public totalResults: number) { }
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


// Update Resource
export class UpdateResource implements Action {
  readonly type = InventoryActionTypes.UpdateResource;
  constructor(public payload: Resource) { }
}

// Update Resource Success
export class UpdateResourceSuccess implements Action {
  readonly type = InventoryActionTypes.UpdateResourceSuccess;
  constructor(public payload: Resource) { }
}

// Update Resource Fail
export class UpdateResourceFail implements Action {
  readonly type = InventoryActionTypes.UpdateResourceFail;
  constructor(public payload: ApiError[]) { }
}


/**
 * Checkup
 */


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

// Create checkups
export class CreateCheckups implements Action {
  readonly type = InventoryActionTypes.CreateCheckups;
  constructor(public payload: { resources: Resource[] }) { }
}

// Create checkups Success
export class CreateCheckupsSuccess implements Action {
  readonly type = InventoryActionTypes.CreateCheckupsSuccess;
  constructor(public payload: Resource[]) { }
}

// Create checkups Fail
export class CreateCheckupsFail implements Action {
  readonly type = InventoryActionTypes.CreateCheckupsFail;
  constructor(public payload: ApiError[]) { }
}

// Update checkup
export class UpdateCheckup implements Action {
  readonly type = InventoryActionTypes.UpdateCheckup;
  constructor(public payload: { resourceId: string, data: any }) { }
}

// Update checkup Success
export class UpdateCheckupSuccess implements Action {
  readonly type = InventoryActionTypes.UpdateCheckupSuccess;
  constructor(public payload: Resource) { }
}

// Update checkup Fail
export class UpdateCheckupFail implements Action {
  readonly type = InventoryActionTypes.UpdateCheckupFail;
  constructor(public payload: ApiError[]) { }
}


/**
 * Approve
 */

// Update Approve
export class Approve implements Action {
  readonly type = InventoryActionTypes.Approve;
  constructor(public payload: { resourceId: string, maintenanceId: string }) { }
}

// Update Approve Success
export class ApproveSuccess implements Action {
  readonly type = InventoryActionTypes.ApproveSuccess;
  constructor(public payload: Resource) { }
}

// Update Approve Fail
export class ApproveFail implements Action {
  readonly type = InventoryActionTypes.ApproveFail;
  constructor(public payload: ApiError[]) { }
}

// Approve r
export class ApproveRepair implements Action {
  readonly type = InventoryActionTypes.ApproveRepair;
  constructor(public payload: { resourceId: string, repairId: string }) { }
}

// Approve Success
export class ApproveRepairSuccess implements Action {
  readonly type = InventoryActionTypes.ApproveRepairSuccess;
  constructor(public payload: Resource) { }
}

// Approve Fail
export class ApproveRepairFail implements Action {
  readonly type = InventoryActionTypes.ApproveRepairFail;
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
  | UpdateResource
  | UpdateResourceSuccess
  | UpdateResourceFail
  | CreateCheckup
  | CreateCheckupSuccess
  | CreateCheckupFail
  | CreateCheckups
  | CreateCheckupsSuccess
  | CreateCheckupsFail
  | UpdateCheckup
  | UpdateCheckupSuccess
  | UpdateCheckupFail
  | Approve
  | ApproveSuccess
  | ApproveFail
  | ApproveRepair
  | ApproveRepairSuccess
  | ApproveRepairFail;
