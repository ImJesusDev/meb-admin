import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
/* NgRx */
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
/* Operators */
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

/* Services */
import { LocationsService } from '../../services';

/* Actions */
import {
  LoadCountries,
  LoadCountriesSuccess,
  LoadCountriesFail,
  LocationActionTypes,
} from './locations.actions';
/* Models */
import { Country, ApiError } from '../../models';

@Injectable()
export class LocationsEffects {
  constructor(
    private $actions: Actions,
    private _locationsService: LocationsService
  ) {}

  /**
   * Effect to listen for the LoadCountries action
   * and make http request to load countries
   * from API
   */
  $getCountries = createEffect(() => {
    return this.$actions.pipe(
      ofType(LocationActionTypes.LoadCountries),
      switchMap((action: LoadCountries) =>
        this._locationsService
          .getCountries()
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((countries: Country[]) => [
              new LoadCountriesSuccess(countries),
            ]),
            catchError((error) => of(new LoadCountriesFail(error)))
          )
      )
    );
  });
}
