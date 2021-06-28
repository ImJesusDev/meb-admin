import { Action } from '@ngrx/store';
import { Country, ApiError } from '../../models';

export enum LocationActionTypes {
  LoadCountries = '[Locations] Load Countries',
  LoadCountriesSuccess = '[Locations] Load Countries Success',
  LoadCountriesFail = '[Locations] Load Countries Fail',
}
export class LoadCountries implements Action {
  readonly type = LocationActionTypes.LoadCountries;
}

export class LoadCountriesSuccess implements Action {
  readonly type = LocationActionTypes.LoadCountriesSuccess;
  constructor(public payload: Country[]) {}
}

export class LoadCountriesFail implements Action {
  readonly type = LocationActionTypes.LoadCountriesFail;
  constructor(public payload: ApiError[]) {}
}

export type LocationActions =
  | LoadCountries
  | LoadCountriesSuccess
  | LoadCountriesFail;
