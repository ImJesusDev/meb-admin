import { Action } from '@ngrx/store';
/* Models */
import { ApiError } from '@models/api-error';
import { Resource } from '@models/inventory';


/* Enum to specify all maintenance actions */
export enum MaintenanceActionTypes {
  CreateMaintenance = '[Maintenance] Create maintenance',
  CreateMaintenanceSuccess = '[Maintenance] Create maintenance success',
  CreateMaintenanceFail = '[Maintenance] Create maintenance fail',
  UpdateMaintenance = '[Maintenance] Update maintenance',
  UpdateMaintenanceSuccess = '[Maintenance] Update maintenance success',
  UpdateMaintenanceFail = '[Maintenance] Update maintenance fail',
  StartMaintenance = '[Maintenance] Start maintenance',
  StartMaintenanceSuccess = '[Maintenance] Start maintenance success',
  StartMaintenanceFail = '[Maintenance] Start maintenance fail',
  LoadHistoryMaintenance = '[Maintenance] Load history maintenance',
  LoadHistoryMaintenanceSuccess = '[Maintenance] Load history maintenance success',
  LoadHistoryMaintenanceFail = '[Maintenance] Load history maintenance fail',
}


/**
 * Maintenance
 */

// Create maintenance
export class CreateMaintenance implements Action {
  readonly type = MaintenanceActionTypes.CreateMaintenance;
  constructor(public payload: { resourceId: string }) { }
}

// Create maintenance Success
export class CreateMaintenanceSuccess implements Action {
  readonly type = MaintenanceActionTypes.CreateMaintenanceSuccess;
  constructor(public payload: Resource) { }
}

// Create maintenance Fail
export class CreateMaintenanceFail implements Action {
  readonly type = MaintenanceActionTypes.CreateMaintenanceFail;
  constructor(public payload: ApiError[]) { }
}


// Update maintenance
export class UpdateMaintenance implements Action {
  readonly type = MaintenanceActionTypes.UpdateMaintenance;
  constructor(public payload: { resourceId: string, data: any }) { }
}

// Update maintenance Success
export class UpdateMaintenanceSuccess implements Action {
  readonly type = MaintenanceActionTypes.UpdateMaintenanceSuccess;
  constructor(public payload: Resource) { }
}

// Update maintenance Fail
export class UpdateMaintenanceFail implements Action {
  readonly type = MaintenanceActionTypes.UpdateMaintenanceFail;
  constructor(public payload: ApiError[]) { }
}


// Start maintenance
export class StartMaintenance implements Action {
  readonly type = MaintenanceActionTypes.StartMaintenance;
  constructor(public payload: { resourceId: string, maintenanceId: string }) { }
}

// Start maintenance Success
export class StartMaintenanceSuccess implements Action {
  readonly type = MaintenanceActionTypes.StartMaintenanceSuccess;
  constructor(public payload: Resource) { }
}

// Start maintenance Fail
export class StartMaintenanceFail implements Action {
  readonly type = MaintenanceActionTypes.StartMaintenanceFail;
  constructor(public payload: ApiError[]) { }
}


// Load history maintenance
export class LoadHistoryMaintenance implements Action {
  readonly type = MaintenanceActionTypes.LoadHistoryMaintenance;
  constructor(public payload: { page: number }) { }
}

// Load history maintenance Success
export class LoadHistoryMaintenanceSuccess implements Action {
  readonly type = MaintenanceActionTypes.LoadHistoryMaintenanceSuccess;
  constructor(public payload: Resource[]) { }
}

// Load history maintenance Fail
export class LoadHistoryMaintenanceFail implements Action {
  readonly type = MaintenanceActionTypes.LoadHistoryMaintenanceFail;
  constructor(public payload: ApiError[]) { }
}


/* Export all actions */
export type MaintenanceActions =
  | CreateMaintenance
  | CreateMaintenanceSuccess
  | CreateMaintenanceFail
  | UpdateMaintenance
  | UpdateMaintenanceSuccess
  | UpdateMaintenanceFail
  | StartMaintenance
  | StartMaintenanceSuccess
  | StartMaintenanceFail
  | LoadHistoryMaintenance
  | LoadHistoryMaintenanceSuccess
  | LoadHistoryMaintenanceFail;
