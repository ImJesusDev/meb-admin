import { Action } from '@ngrx/store';

export enum LoaderActionTypes {
  StartLoader = '[Loader] Start Loader',
  StopLoader = '[Loader] Stop Loader',
}

export class StartLoader implements Action {
  readonly type = LoaderActionTypes.StartLoader;
}

export class StopLoader implements Action {
  readonly type = LoaderActionTypes.StopLoader;
}

export type LoaderActions = StopLoader | StartLoader;
