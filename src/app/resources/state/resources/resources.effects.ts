import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
/* NgRx */
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
/* Operators */
import { switchMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';
/* Alerts */
import Swal from 'sweetalert2';
/* Services */
import { ResourcesService } from '../../../services';
/* Actions */
import {
  LoadResources,
  LoadResourcesSuccess,
  LoadResourcesFail,
  ResourcesActionTypes,
  AddResource,
  AddResourceSuccess,
  AddResourceFail,
} from './resources.actions';

import { StopLoader } from '../../../state/loader/loader.actions';

/* Models */
import { ResourceType, ApiError } from '../../../models';

@Injectable()
export class ResourcesEffects {
  constructor(
    private router: Router,
    private $actions: Actions,
    private _resourcesService: ResourcesService
  ) { }

  /**
   * Effect to listen for the LoadResources action
   * and make http request to load resources
   * from API
   */
  $getResourceTypes = createEffect(() => {
    return this.$actions.pipe(
      ofType(ResourcesActionTypes.LoadResources),
      switchMap((action: LoadResources) =>
        this._resourcesService
          .getResourceTypes()
          // .pipe(delay(1500)) // Small delay to test loader
          .pipe(
            mergeMap((resources: ResourceType[]) => [
              new StopLoader(),
              new LoadResourcesSuccess(resources),
            ]),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new LoadResourcesFail(errors), new StopLoader());
            })
          )
      )
    );
  });
  /**
   * Effect to listen for the AddClient action
   * and make http request to add client
   * from API
   */
  $addClient = createEffect(() => {
    return this.$actions.pipe(
      ofType(ResourcesActionTypes.AddResource),
      switchMap((action: AddResource) =>
        this._resourcesService.addResourceType(action.payload)
          .pipe(
            mergeMap((resourceType: ResourceType) => [
              new StopLoader(),
              new AddResourceSuccess(resourceType),
            ]),
            tap(() => {
              this.router.navigate(['/recursos']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new AddResourceFail(errors), new StopLoader());
            })
          )
      )
    );
  });
}
