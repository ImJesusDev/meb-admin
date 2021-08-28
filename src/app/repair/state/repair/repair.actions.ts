import { Action } from '@ngrx/store';
/* Models */
import { ApiError } from '@models/api-error';
import { Resource } from '@models/inventory';


/* Enum to specify all repair actions */
export enum RepairActionTypes {
  CreateRepair = '[Repair] Create repair',
  CreateRepairSuccess = '[Repair] Create repair success',
  CreateRepairFail = '[Repair] Create repair fail',
  UpdateRepair = '[Repair] Update repair',
  UpdateRepairSuccess = '[Repair] Update repair success',
  UpdateRepairFail = '[Repair] Update repair fail',
  StartRepair = '[Repair] Start repair',
  StartRepairSuccess = '[Repair] Start repair success',
  StartRepairFail = '[Repair] Start repair fail',
}


/**
 * Repair
 */

// Create repair
export class CreateRepair implements Action {
  readonly type = RepairActionTypes.CreateRepair;
  constructor(public payload: { resourceId: string }) { }
}

// Create repair Success
export class CreateRepairSuccess implements Action {
  readonly type = RepairActionTypes.CreateRepairSuccess;
  constructor(public payload: Resource) { }
}

// Create repair Fail
export class CreateRepairFail implements Action {
  readonly type = RepairActionTypes.CreateRepairFail;
  constructor(public payload: ApiError[]) { }
}


// Update repair
export class UpdateRepair implements Action {
  readonly type = RepairActionTypes.UpdateRepair;
  constructor(public payload: { resourceId: string, data: any }) { }
}

// Update repair Success
export class UpdateRepairSuccess implements Action {
  readonly type = RepairActionTypes.UpdateRepairSuccess;
  constructor(public payload: Resource) { }
}

// Update repair Fail
export class UpdateRepairFail implements Action {
  readonly type = RepairActionTypes.UpdateRepairFail;
  constructor(public payload: ApiError[]) { }
}


// Start repair
export class StartRepair implements Action {
  readonly type = RepairActionTypes.StartRepair;
  constructor(public payload: { resourceId: string, repairId: string }) { }
}

// Start repair Success
export class StartRepairSuccess implements Action {
  readonly type = RepairActionTypes.StartRepairSuccess;
  constructor(public payload: Resource) { }
}

// Start repair Fail
export class StartRepairFail implements Action {
  readonly type = RepairActionTypes.StartRepairFail;
  constructor(public payload: ApiError[]) { }
}


/* Export all actions */
export type RepairActions =
  | CreateRepair
  | CreateRepairSuccess
  | CreateRepairFail
  | UpdateRepair
  | UpdateRepairSuccess
  | UpdateRepairFail
  | StartRepair
  | StartRepairSuccess
  | StartRepairFail;
