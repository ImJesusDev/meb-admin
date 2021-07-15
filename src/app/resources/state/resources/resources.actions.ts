import { Action } from '@ngrx/store';
import { ResourceType, ApiError } from 'src/app/models';

/* Enum to specify all resources actions */
export enum ResourcesActionTypes {
  LoadResources = '[Resources] Load Resources',
  LoadResourcesSuccess = '[Resources] Load Resources Success',
  LoadResourcesFail = '[Resources] Load Resources Fail',
}

// Load Resources
export class LoadResources implements Action {
  readonly type = ResourcesActionTypes.LoadResources;
}
// Load Success
export class LoadResourcesSuccess implements Action {
  readonly type = ResourcesActionTypes.LoadResourcesSuccess;
  constructor(public payload: ResourceType[]) {}
}
// Load Fail
export class LoadResourcesFail implements Action {
  readonly type = ResourcesActionTypes.LoadResourcesFail;
  constructor(public payload: ApiError[]) {}
}
/* Export all actions */
export type ResourcesActions =
  | LoadResources
  | LoadResourcesSuccess
  | LoadResourcesFail;
