import { Action } from '@ngrx/store';
import { ResourceType, ApiError } from 'src/app/models';

/* Enum to specify all resources actions */
export enum ResourcesActionTypes {
  LoadResources = '[Resources] Load Resources',
  LoadResourcesSuccess = '[Resources] Load Resources Success',
  LoadResourcesFail = '[Resources] Load Resources Fail',
  AddResource = '[Resources] Add Resource',
  AddResourceSuccess = '[Resources] Add Resource Success',
  AddResourceFail = '[Resources] Add Resource Fail',
}

// Load Resources
export class LoadResources implements Action {
  readonly type = ResourcesActionTypes.LoadResources;
}
// Load Success
export class LoadResourcesSuccess implements Action {
  readonly type = ResourcesActionTypes.LoadResourcesSuccess;
  constructor(public payload: ResourceType[]) { }
}
// Load Fail
export class LoadResourcesFail implements Action {
  readonly type = ResourcesActionTypes.LoadResourcesFail;
  constructor(public payload: ApiError[]) { }
}

/**
 * Classes related to handle single resource
 */

// Add Resource
export class AddResource implements Action {
  readonly type = ResourcesActionTypes.AddResource;
  constructor(public payload: ResourceType) { }
}

// Add Resource Success
export class AddResourceSuccess implements Action {
  readonly type = ResourcesActionTypes.AddResourceSuccess;
  constructor(public payload: ResourceType) { }
}

// Add Resource Fail
export class AddResourceFail implements Action {
  readonly type = ResourcesActionTypes.AddResourceFail;
  constructor(public payload: ApiError[]) { }
}

/* Export all actions */
export type ResourcesActions =
  | LoadResources
  | LoadResourcesSuccess
  | LoadResourcesFail
  | AddResource
  | AddResourceSuccess
  | AddResourceFail;
