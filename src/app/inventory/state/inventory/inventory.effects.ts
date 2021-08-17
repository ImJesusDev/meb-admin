import { PaginationResources } from './../../../models/inventory';
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
  AddResourceFail,
  CreateCheckup,
  CreateCheckupSuccess,
  CreateCheckupFail,
  UpdateCheckup,
  UpdateCheckupSuccess,
  UpdateCheckupFail,
  CreateMaintenance,
  CreateMaintenanceSuccess,
  CreateMaintenanceFail,
  UpdateMaintenance,
  UpdateMaintenanceSuccess,
  UpdateMaintenanceFail,
  CreateReparation,
  CreateReparationSuccess,
  CreateReparationFail,
  UpdateReparation,
  UpdateReparationSuccess,
  UpdateReparationFail,
  Approve,
  ApproveSuccess,
  ApproveFail
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
          .getResources(action.payload)
          .pipe(
            mergeMap((pagination: PaginationResources) => [
              new StopLoader(),
              new LoadResourcesSuccess(pagination.resources)
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
  $addResource = createEffect(() => {
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
  /**
   * Effect to listen for the CreateCheckup action
   * and make http request to create checkup
   * from API
   */
  $createCheckup = createEffect(() => {
    return this.$actions.pipe(
      ofType(InventoryActionTypes.CreateCheckup),
      switchMap((action: CreateCheckup) =>
        this._inventoryService.createCheckup(action.payload.resourceId)
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new CreateCheckupSuccess(resource),
            ]),
            tap(() => {
              this.router.navigate(['/check-ups']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new CreateCheckupFail(errors), new StopLoader());
            })
          )
      )
    );
  });
  /**
   * Effect to listen for the UpdateCheckup action
   * and make http request to update checkup
   * from API
   */
  $updateCheckup = createEffect(() => {
    return this.$actions.pipe(
      ofType(InventoryActionTypes.UpdateCheckup),
      switchMap((action: UpdateCheckup) =>
        this._inventoryService.updateCheckup(action.payload.resourceId, action.payload.data)
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new UpdateCheckupSuccess(resource),
            ]),
            tap(() => {
              this.router.navigate(['/check-ups/history']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new UpdateCheckupFail(errors), new StopLoader());
            })
          )
      )
    );
  });


  /**
   * Effect to listen for the CreateMaintenance action
   * and make http request to create Maintenance
   * from API
   */
  $createMaintenance = createEffect(() => {
    return this.$actions.pipe(
      ofType(InventoryActionTypes.CreateMaintenance),
      switchMap((action: CreateMaintenance) =>
        this._inventoryService.createMaintenance(action.payload.resourceId)
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new CreateMaintenanceSuccess(resource),
            ]),
            tap(() => {
              this.router.navigate(['/mantenimientos']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new CreateMaintenanceFail(errors), new StopLoader());
            })
          )
      )
    );
  });
  /**
   * Effect to listen for the UpdateMaintenance action
   * and make http request to update Maintenance
   * from API
   */
  $updateMaintenance = createEffect(() => {
    return this.$actions.pipe(
      ofType(InventoryActionTypes.UpdateMaintenance),
      switchMap((action: UpdateMaintenance) =>
        this._inventoryService.updateMaintenance(action.payload.resourceId)
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new UpdateCheckupSuccess(resource),
            ]),
            tap(() => {
              this.router.navigate(['/mantenimientos/history']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new UpdateMaintenanceFail(errors), new StopLoader());
            })
          )
      )
    );
  });

  /**
   * Effect to listen for the CreateReparation action
   * and make http request to create Reparation
   * from API
   */
  $createReparation = createEffect(() => {
    return this.$actions.pipe(
      ofType(InventoryActionTypes.CreateReparation),
      switchMap((action: CreateReparation) =>
        this._inventoryService.createReparation(action.payload.resourceId)
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new CreateReparationSuccess(resource),
            ]),
            tap(() => {
              this.router.navigate(['/reparaciones']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new CreateReparationFail(errors), new StopLoader());
            })
          )
      )
    );
  });
  /**
   * Effect to listen for the UpdateReparation action
   * and make http request to update Reparation
   * from API
   */
  $updateReparation = createEffect(() => {
    return this.$actions.pipe(
      ofType(InventoryActionTypes.UpdateReparation),
      switchMap((action: UpdateReparation) =>
        this._inventoryService.updateReparation(action.payload.resourceId)
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new UpdateCheckupSuccess(resource),
            ]),
            tap(() => {
              this.router.navigate(['/reparaciones/history']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new UpdateReparationFail(errors), new StopLoader());
            })
          )
      )
    );
  });
  /**
   * Effect to listen for the Approve action
   * and make http request to Approve
   * from API
   */
  $approve = createEffect(() => {
    return this.$actions.pipe(
      ofType(InventoryActionTypes.Approve),
      switchMap((action: Approve) =>
        this._inventoryService.approve(action.payload.resourceId)
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new ApproveSuccess(resource),
            ]),
            tap(() => {
              this.router.navigate(['/aprovaciones/history']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new ApproveFail(errors), new StopLoader());
            })
          )
      )
    );
  });

}
