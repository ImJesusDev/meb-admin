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
  ChangeLockerPass,
  ChangeLockerPassSuccess,
  ChangeLockerPassFail,
  CreateCheckup,
  CreateCheckupSuccess,
  CreateCheckupFail,
  CreateCheckups,
  CreateCheckupsSuccess,
  CreateCheckupsFail,
  UpdateCheckup,
  UpdateCheckupSuccess,
  UpdateCheckupFail,
  Approve,
  ApproveSuccess,
  ApproveFail,
  ApproveRepair,
  ApproveRepairSuccess,
  ApproveRepairFail,
} from './inventory.actions';

import { StopLoader } from '@state/loader/loader.actions';

/* Models */
import { ApiError, Resource } from '@models/index';
import { ApproveService } from '@services/approve.service';

@Injectable()
export class InventoryEffects {
  constructor(
    private router: Router,
    private $actions: Actions,
    private inventoryService: InventoryService,
    private approveService: ApproveService,
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
        this.inventoryService
          .getResources(action.payload)
          .pipe(
            mergeMap((pagination: PaginationResources) => [
              new StopLoader(),
              new LoadResourcesSuccess(pagination.resources, pagination.page, pagination.totalResults)
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
        this.inventoryService.addResource(action.payload)
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new AddResourceSuccess(resource),
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Recurso creado!',
                showCancelButton: false,
                showDenyButton: false,
                confirmButtonText: `Aceptar`,
                confirmButtonColor: '#50b848',
                icon: 'success',
              });
              this.router.navigate(['/inventario']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                Swal.fire({
                  title: '¡Error creando el recurso!',
                  text: `${errors[0].message}`,
                  showCancelButton: false,
                  showDenyButton: false,
                  confirmButtonText: `Aceptar`,
                  confirmButtonColor: '#50b848',
                  icon: 'error',
                });
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
   * Effect to listen for the AddClient action
   * and make http request to add client
   * from API
   */
  $changeLockerPassword = createEffect(() => {
    return this.$actions.pipe(
      ofType(InventoryActionTypes.ChangeLockerPass),
      switchMap((action: ChangeLockerPass) =>
        this.inventoryService.updateLockerPassword(action.payload)
          .pipe(
            mergeMap((resource: Resource[]) => [
              new StopLoader(),
              new ChangeLockerPassSuccess(resource),
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Contraseñas actualizadas!',
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
                Swal.fire({
                  title: '¡Error actualizando las contraseñas!',
                  text: `${errors[0].message}`,
                  showCancelButton: false,
                  showDenyButton: false,
                  confirmButtonText: `Aceptar`,
                  confirmButtonColor: '#50b848',
                  icon: 'error',
                });
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new ChangeLockerPassFail(errors), new StopLoader());
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
        this.inventoryService.createCheckup(action.payload.resourceId)
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new CreateCheckupSuccess(resource),
              new LoadResources()
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Recurso enviado a chequeo!',
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
                Swal.fire({
                  title: '¡Error al enviar el recurso a chequeo!',
                  showCancelButton: false,
                  showDenyButton: false,
                  confirmButtonText: `Aceptar`,
                  confirmButtonColor: '#50b848',
                  icon: 'success',
                });
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
   * Effect to listen for the CreateCheckup action
   * and make http request to create checkup
   * from API
   */
  $createCheckups = createEffect(() => {
    return this.$actions.pipe(
      ofType(InventoryActionTypes.CreateCheckups),
      switchMap((action: CreateCheckups) =>
        this.inventoryService.createCheckups(action.payload)
          .pipe(
            mergeMap((resources: Resource[]) => [
              new StopLoader(),
              new CreateCheckupsSuccess(resources),
              new LoadResources()
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Recursos enviado a chequeo!',
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
                Swal.fire({
                  title: '¡Error al enviar los recursos a chequeo!',
                  showCancelButton: false,
                  showDenyButton: false,
                  confirmButtonText: `Aceptar`,
                  confirmButtonColor: '#50b848',
                  icon: 'error',
                });
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new CreateCheckupsFail(errors), new StopLoader());
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
        this.inventoryService.updateCheckup(action.payload.resourceId, action.payload.data)
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new UpdateCheckupSuccess(resource),
            ]),
            tap(() => {
              this.router.navigate(['/check-ups/historial']);
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
   * Effect to listen for the Approve action
   * and make http request to Approve
   * from API
   */
  $approve = createEffect(() => {
    return this.$actions.pipe(
      ofType(InventoryActionTypes.Approve),
      switchMap((action: Approve) =>
        this.approveService.approveMaintenance({ resourceId: action.payload.resourceId, maintenanceId: action.payload.maintenanceId })
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new ApproveSuccess(resource),
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Mantenimiento Aprobada!',
                showCancelButton: false,
                showDenyButton: false,
                confirmButtonText: `Aceptar`,
                confirmButtonColor: '#50b848',
                icon: 'success',
              });
              this.router.navigate(['/aprobaciones/historial']);
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
  /**
   * Effect to listen for the Approve action
   * and make http request to Approve
   * from API
   */
  $approveRepair = createEffect(() => {
    return this.$actions.pipe(
      ofType(InventoryActionTypes.ApproveRepair),
      switchMap((action: ApproveRepair) =>
        this.approveService.approveRepair({ resourceId: action.payload.resourceId, repairId: action.payload.repairId })
          .pipe(
            mergeMap((resource: Resource) => [
              new StopLoader(),
              new ApproveRepairSuccess(resource),
            ]),
            tap(() => {
              Swal.fire({
                title: '¡Reparación Aprobada!',
                showCancelButton: false,
                showDenyButton: false,
                confirmButtonText: `Aceptar`,
                confirmButtonColor: '#50b848',
                icon: 'success',
              });
              this.router.navigate(['/aprobaciones/historial-reparaciones']);
            }),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new ApproveRepairFail(errors), new StopLoader());
            })
          )
      )
    );
  });

}
