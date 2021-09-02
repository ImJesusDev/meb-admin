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
import { MaintenanceService } from '@services/maintenance.service';
/* Actions */
import {
  MaintenanceActionTypes,
  CreateMaintenance,
  CreateMaintenanceSuccess,
  CreateMaintenanceFail,
  CreateMaintenances,
  CreateMaintenancesSuccess,
  CreateMaintenancesFail,
  UpdateMaintenance,
  UpdateMaintenanceSuccess,
  UpdateMaintenanceFail,
} from './maintenance.actions';

import { StopLoader } from '@state/loader/loader.actions';

/* Models */
import { ApiError, Resource } from '@models/index';
import {
  LoadHistoryMaintenance,
  LoadHistoryMaintenanceFail,
  LoadHistoryMaintenanceSuccess,
  StartMaintenance,
  StartMaintenanceFail,
  StartMaintenanceSuccess
} from '.';
import { LoadResources } from 'src/app/inventory/state/inventory/inventory.actions';
import { RESOURCE_STATUS } from '@models/inventory';

@Injectable()
export class MaintenanceEffects {
  constructor(
    private router: Router,
    private $actions: Actions,
    private maintenanceService: MaintenanceService
  ) { }

  /**
   * Effect to listen for the CreateMaintenance action
   * and make http request to create Maintenance
   * from API
   */
  $createMaintenance = createEffect(() => {
    return this.$actions.pipe(
      ofType(MaintenanceActionTypes.CreateMaintenance),
      switchMap((action: CreateMaintenance) =>
        this.maintenanceService.createMaintenance(action.payload.resourceId)
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new CreateMaintenanceSuccess(resource)
            ]),
            tap(() => {
              this.router.navigate(['/mantenimientos']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
                Swal.fire({
                  title: '¡Error creando el manteniento!',
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
              return of(new CreateMaintenanceFail(errors), new StopLoader());
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
  $createMaintenances = createEffect(() => {
    return this.$actions.pipe(
      ofType(MaintenanceActionTypes.CreateMaintenances),
      switchMap((action: CreateMaintenances) =>
        this.maintenanceService.createMaintenances(action.payload)
          .pipe(
            mergeMap(() => [
              new StopLoader(),
              new CreateMaintenancesSuccess(),
              new LoadResources()
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Mantenimiento creandos con éxito!',
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
                  title: '¡Error creando el manteniento!',
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
      ofType(MaintenanceActionTypes.UpdateMaintenance),
      switchMap((action: UpdateMaintenance) =>
        this.maintenanceService.updateMaintenance(action.payload.resourceId, action.payload.data)
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new UpdateMaintenanceSuccess(resource)
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Mantenimiento Finalizado!',
                showCancelButton: false,
                showDenyButton: false,
                confirmButtonText: `Aceptar`,
                confirmButtonColor: '#50b848',
                icon: 'success',
              });
              this.router.navigate(['/mantenimientos/historial']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
                Swal.fire({
                  title: '¡Error finalizando el manteniento!',
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
              return of(new UpdateMaintenanceFail(errors), new StopLoader());
            })
          )
      )
    );
  });
  /**
   * Effect to listen for the StartMaintenance action
   * and make http request to Start Maintenance
   * from API
   */
  $startMaintenance = createEffect(() => {
    return this.$actions.pipe(
      ofType(MaintenanceActionTypes.StartMaintenance),
      switchMap((action: StartMaintenance) =>
        this.maintenanceService.startMaintenance(action.payload)
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new StartMaintenanceSuccess(resource),
              new LoadResources({ page: 1, status: RESOURCE_STATUS.PendingMaintenance })
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Mantenimiento iniciado!',
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
                  title: '¡Error iniciando el manteniento!',
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
              return of(new StartMaintenanceFail(errors), new StopLoader());
            })
          )
      )
    );
  });
  /**
   * Effect to listen for the LoadHistoryMaintenance action
   * and make http request to Load history Maintenance
   * from API
   */
  $loadHistoryMaintenance = createEffect(() => {
    return this.$actions.pipe(
      ofType(MaintenanceActionTypes.LoadHistoryMaintenance),
      switchMap((action: LoadHistoryMaintenance) =>
        this.maintenanceService.getHistoryMaintenance({ page: action.payload.page })
          .pipe(
            mergeMap((resource: Resource[]) => [
              new StopLoader(),
              new LoadHistoryMaintenanceSuccess(resource)
            ]),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
                Swal.fire({
                  title: '¡Error trayendo el historial de mantenimientos!',
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
              return of(new LoadHistoryMaintenanceFail(errors), new StopLoader());
            })
          )
      )
    );
  });

}
