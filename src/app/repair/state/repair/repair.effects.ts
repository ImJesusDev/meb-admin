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
import { RepairService } from '@services/repair.service';
/* Actions */
import {
  RepairActionTypes,
  CreateRepair,
  CreateRepairSuccess,
  CreateRepairFail,
  UpdateRepair,
  UpdateRepairSuccess,
  UpdateRepairFail,
} from './repair.actions';

import { StopLoader } from '@state/loader/loader.actions';

/* Models */
import { ApiError, Resource } from '@models/index';
import { StartRepair, StartRepairFail, StartRepairSuccess } from '.';
import { LoadResources } from 'src/app/inventory/state/inventory/inventory.actions';
import { RESOURCE_STATUS } from '@models/inventory';

@Injectable()
export class RepairEffects {
  constructor(
    private router: Router,
    private $actions: Actions,
    private _repairService: RepairService
  ) { }

  /**
   * Effect to listen for the CreateRepair action
   * and make http request to create Repair
   * from API
   */
  $createRepair = createEffect(() => {
    return this.$actions.pipe(
      ofType(RepairActionTypes.CreateRepair),
      switchMap((action: CreateRepair) =>
        this._repairService.createRepair(action.payload.resourceId)
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new CreateRepairSuccess(resource),
            ]),
            tap(() => {
              this.router.navigate(['/reparaciones']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
                Swal.fire({
                  title: '¡Error creando la reparación!',
                  text: `${errors[0].message}`,
                  showCancelButton: false,
                  showDenyButton: false,
                  confirmButtonText: `Aceptar`,
                  confirmButtonColor: '#50b848',
                  icon: 'error',
                });
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new CreateRepairFail(errors), new StopLoader());
            })
          )
      )
    );
  });
  /**
   * Effect to listen for the UpdateRepair action
   * and make http request to update Repair
   * from API
   */
  $updateRepair = createEffect(() => {
    return this.$actions.pipe(
      ofType(RepairActionTypes.UpdateRepair),
      switchMap((action: UpdateRepair) =>
        this._repairService.updateRepair(action.payload.resourceId, action.payload.data)
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new UpdateRepairSuccess(resource)
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Reparación finalizada!',
                showCancelButton: false,
                showDenyButton: false,
                confirmButtonText: `Aceptar`,
                confirmButtonColor: '#50b848',
                icon: 'success',
              });
              this.router.navigate(['/reparaciones/historial']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
                Swal.fire({
                  title: '¡Error finalizando la reparación!',
                  text: `${errors[0].message}`,
                  showCancelButton: false,
                  showDenyButton: false,
                  confirmButtonText: `Aceptar`,
                  confirmButtonColor: '#50b848',
                  icon: 'error',
                });
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new UpdateRepairFail(errors), new StopLoader());
            })
          )
      )
    );
  });
  /**
   * Effect to listen for the StartRepair action
   * and make http request to Start Repair
   * from API
   */
  $startRepair = createEffect(() => {
    return this.$actions.pipe(
      ofType(RepairActionTypes.StartRepair),
      switchMap((action: StartRepair) =>
        this._repairService.startRepair(action.payload)
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new StartRepairSuccess(resource),
              new LoadResources({ page: 1, status: RESOURCE_STATUS.PendingRepair })
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Reparación iniciada!',
                showCancelButton: false,
                showDenyButton: false,
                confirmButtonText: `Aceptar`,
                confirmButtonColor: '#50b848',
                icon: 'success',
              });
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
                Swal.fire({
                  title: '¡Error iniciando la reparación!',
                  text: `${errors[0].message}`,
                  showCancelButton: false,
                  showDenyButton: false,
                  confirmButtonText: `Aceptar`,
                  confirmButtonColor: '#50b848',
                  icon: 'error',
                });
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new StartRepairFail(errors), new StopLoader());
            })
          )
      )
    );
  });

}
