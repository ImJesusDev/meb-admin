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
  CreateCheckupFail = '[Inventory] Create checkup fail',
  UpdateCheckup = '[Inventory] Update checkup',
  UpdateCheckupSuccess = '[Inventory] Update checkup success',
  UpdateCheckupFail = '[Inventory] Update checkup fail',
  CreateMaintenance = '[Inventory] Create maintenance',
  CreateMaintenanceSuccess = '[Inventory] Create maintenance success',
  CreateMaintenanceFail = '[Inventory] Create maintenance fail',
  UpdateMaintenance = '[Inventory] Update maintenance',
  UpdateMaintenanceSuccess = '[Inventory] Update maintenance success',
  UpdateMaintenanceFail = '[Inventory] Update maintenance fail',
  CreateReparation = '[Inventory] Create reparation',
  CreateReparationSuccess = '[Inventory] Create reparation success',
  CreateReparationFail = '[Inventory] Create reparation fail',
  UpdateReparation = '[Inventory] Update reparation',
  UpdateReparationSuccess = '[Inventory] Update reparation success',
  UpdateReparationFail = '[Inventory] Update reparation fail',
  Approve = '[Inventory] Approve',
  ApproveSuccess = '[Inventory] Approve success',
  ApproveFail = '[Inventory] Approve fail',
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
 * Maintenance
 */

// Create maintenance
export class CreateMaintenance implements Action {
  readonly type = InventoryActionTypes.CreateMaintenance;
  constructor(public payload: { resourceId: string }) { }
}

// Create maintenance Success
export class CreateMaintenanceSuccess implements Action {
  readonly type = InventoryActionTypes.CreateMaintenanceSuccess;
  constructor(public payload: Resource) { }
}

// Create maintenance Fail
export class CreateMaintenanceFail implements Action {
  readonly type = InventoryActionTypes.CreateMaintenanceFail;
  constructor(public payload: ApiError[]) { }
}

// Update maintenance
export class UpdateMaintenance implements Action {
  readonly type = InventoryActionTypes.UpdateMaintenance;
  constructor(public payload: { resourceId: string }) { }
}

// Update maintenance Success
export class UpdateMaintenanceSuccess implements Action {
  readonly type = InventoryActionTypes.UpdateMaintenanceSuccess;
  constructor(public payload: Resource) { }
}

// Update maintenance Fail
export class UpdateMaintenanceFail implements Action {
  readonly type = InventoryActionTypes.UpdateMaintenanceFail;
  constructor(public payload: ApiError[]) { }
}


/**
 * Repair
 */

// Create reparation
export class CreateReparation implements Action {
  readonly type = InventoryActionTypes.CreateReparation;
  constructor(public payload: { resourceId: string }) { }
}

// Create reparation Success
export class CreateReparationSuccess implements Action {
  readonly type = InventoryActionTypes.CreateReparationSuccess;
  constructor(public payload: Resource) { }
}

// Create reparation Fail
export class CreateReparationFail implements Action {
  readonly type = InventoryActionTypes.CreateReparationFail;
  constructor(public payload: ApiError[]) { }
}

// Update reparation
export class UpdateReparation implements Action {
  readonly type = InventoryActionTypes.UpdateReparation;
  constructor(public payload: { resourceId: string }) { }
}

// Update reparation Success
export class UpdateReparationSuccess implements Action {
  readonly type = InventoryActionTypes.UpdateReparationSuccess;
  constructor(public payload: Resource) { }
}

// Update reparation Fail
export class UpdateReparationFail implements Action {
  readonly type = InventoryActionTypes.UpdateReparationFail;
  constructor(public payload: ApiError[]) { }
}


/**
 * Approve
 */

// Update Approve
export class Approve implements Action {
  readonly type = InventoryActionTypes.Approve;
  constructor(public payload: { resourceId: string }) { }
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
  | CreateCheckupFail
  | UpdateCheckup
  | UpdateCheckupSuccess
  | UpdateCheckupFail
  | CreateMaintenance
  | CreateMaintenanceSuccess
  | CreateMaintenanceFail
  | UpdateMaintenance
  | UpdateMaintenanceSuccess
  | UpdateMaintenanceFail
  | CreateReparation
  | CreateReparationSuccess
  | CreateReparationFail
  | UpdateReparation
  | UpdateReparationSuccess
  | UpdateReparationFail
  | Approve
  | ApproveSuccess
  | ApproveFail;
