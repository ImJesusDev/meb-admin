import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
/* NgRx */
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
/* Operators */
import { switchMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
/* Alerts */
import Swal from 'sweetalert2';
/* Services */
import { InventoryService } from '@services/inventory.service';
/* Actions */
import {
  LoadResources,
  LoadResourcesSuccess,
  LoadResourcesFail,
  InventoryActionTypes,
  AddResource,
  AddResourceSuccess,
  AddResourceFail
} from './inventory.actions';

import { StopLoader } from '@state/loader/loader.actions';

/* Models */
import { ApiError, Resource } from '@models/index';

@Injectable()
export class InventoryEffects {
  constructor(
    private router: Router,
    private $actions: Actions,
    private _inventoryService: InventoryService
  ) { }

  /**
   * Effect to listen for the LoadResources action
   * and make http request to load resources
   * from API
   */
  $getResources = createEffect(() => {
    return this.$actions.pipe(
      ofType(InventoryActionTypes.LoadResources),
      switchMap((action: LoadResources) =>
        this._inventoryService
          .getResources()
          .pipe(
            mergeMap((resources: Resource[]) => [
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
      ofType(InventoryActionTypes.AddResource),
      switchMap((action: AddResource) =>
        this._inventoryService.addResource(action.payload)
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new AddResourceSuccess(resource),
            ]),
            tap(() => {
              this.router.navigate(['/inventario']);
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
