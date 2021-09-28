// import { HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// /* NgRx */
// import { Actions, createEffect } from '@ngrx/effects';
// import { ofType } from '@ngrx/effects';
// /* Operators */
// import { switchMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
// import { of } from 'rxjs';
// /* Alerts */
// import Swal from 'sweetalert2';
// /* Services */
// import { BookingService } from '@services/booking.service';
// /* Actions */
// import {
//   BookingActionTypes,
//   CreateBooking,
//   CreateBookingSuccess,
//   CreateBookingFail,
//   UpdateBooking,
//   UpdateBookingSuccess,
//   UpdateBookingFail,
// } from './repair.actions';

// import { StopLoader } from '@state/loader/loader.actions';

// /* Models */
// import { ApiError, Resource } from '@models/index';
// import { StartBooking, StartBookingFail, StartBookingSuccess } from '.';
// import { LoadResources } from 'src/app/inventory/state/inventory/inventory.actions';
// import { RESOURCE_STATUS } from '@models/inventory';

// @Injectable()
// export class BookingEffects {
//   constructor(
//     private router: Router,
//     private $actions: Actions,
//     private _BookingService: BookingService
//   ) { }

//   /**
//    * Effect to listen for the CreateBooking action
//    * and make http request to create Repair
//    * from API
//    */
//   // $CreateBooking = createEffect(() => {
//   //   return this.$actions.pipe(
//   //     ofType(BookingActionTypes.CreateBooking),
//   //     switchMap((action: CreateBooking) =>
//   //       this._BookingService.CreateBooking(action.payload.resourceId)
//   //         .pipe(
//   //           mergeMap((resource: Resource) => [
//   //             new StopLoader(),
//   //             new CreateBookingSuccess(resource),
//   //           ]),
//   //           tap(() => {
//   //             this.router.navigate(['/reservas']);
//   //           }),
//   //           catchError((error: HttpErrorResponse) => {
//   //             let errors: ApiError[] = [];
//   //             if (error.error && error.error.errors) {
//   //               errors = error.error.errors;
//   //               Swal.fire({
//   //                 title: '¡Error creando la reparación!',
//   //                 text: `${errors[0].message}`,
//   //                 showCancelButton: false,
//   //                 showDenyButton: false,
//   //                 confirmButtonText: `Aceptar`,
//   //                 confirmButtonColor: '#50b848',
//   //                 icon: 'error',
//   //               });
//   //             } else {
//   //               errors = [{ message: 'Something went wrong' }];
//   //             }
//   //             return of(new CreateBookingFail(errors), new StopLoader());
//   //           })
//   //         )
//   //     )
//   //   );
//   // });
//   /**
//    * Effect to listen for the UpdateBooking action
//    * and make http request to update Repair
//    * from API
//    */
//   // $UpdateBooking = createEffect(() => {
//   //   return this.$actions.pipe(
//   //     ofType(BookingActionTypes.UpdateBooking),
//   //     switchMap((action: UpdateBooking) =>
//   //       this._BookingService.UpdateBooking(action.payload.resourceId, action.payload.data)
//   //         .pipe(
//   //           mergeMap((resource: Resource) => [
//   //             new StopLoader(),
//   //             new UpdateBookingSuccess(resource)
//   //           ]),
//   //           tap(() => {
//   //             Swal.fire({
//   //               title: '¡Reparación finalizada!',
//   //               showCancelButton: false,
//   //               showDenyButton: false,
//   //               confirmButtonText: `Aceptar`,
//   //               confirmButtonColor: '#50b848',
//   //               icon: 'success',
//   //             });
//   //             this.router.navigate(['/reparaciones/historial']);
//   //           }),
//   //           catchError((error: HttpErrorResponse) => {
//   //             let errors: ApiError[] = [];
//   //             if (error.error && error.error.errors) {
//   //               errors = error.error.errors;
//   //               Swal.fire({
//   //                 title: '¡Error finalizando la reparación!',
//   //                 text: `${errors[0].message}`,
//   //                 showCancelButton: false,
//   //                 showDenyButton: false,
//   //                 confirmButtonText: `Aceptar`,
//   //                 confirmButtonColor: '#50b848',
//   //                 icon: 'error',
//   //               });
//   //             } else {
//   //               errors = [{ message: 'Something went wrong' }];
//   //             }
//   //             return of(new UpdateBookingFail(errors), new StopLoader());
//   //           })
//   //         )
//   //     )
//   //   );
//   // });
//   // /**
//   //  * Effect to listen for the StartBooking action
//   //  * and make http request to Start Repair
//   //  * from API
//   //  */
//   // $StartBooking = createEffect(() => {
//   //   return this.$actions.pipe(
//   //     ofType(BookingActionTypes.StartBooking),
//   //     switchMap((action: StartBooking) =>
//   //       this._BookingService.StartBooking(action.payload)
//   //         .pipe(
//   //           mergeMap((resource: Resource) => [
//   //             new StopLoader(),
//   //             new StartBookingSuccess(resource),
//   //             new LoadResources({ page: 1, status: RESOURCE_STATUS.PendingRepair })
//   //           ]),
//   //           tap(() => {
//   //             Swal.fire({
//   //               title: '¡Reparación iniciada!',
//   //               showCancelButton: false,
//   //               showDenyButton: false,
//   //               confirmButtonText: `Aceptar`,
//   //               confirmButtonColor: '#50b848',
//   //               icon: 'success',
//   //             });
//   //           }),
//   //           catchError((error: HttpErrorResponse) => {
//   //             let errors: ApiError[] = [];
//   //             if (error.error && error.error.errors) {
//   //               errors = error.error.errors;
//   //               Swal.fire({
//   //                 title: '¡Error iniciando la reparación!',
//   //                 text: `${errors[0].message}`,
//   //                 showCancelButton: false,
//   //                 showDenyButton: false,
//   //                 confirmButtonText: `Aceptar`,
//   //                 confirmButtonColor: '#50b848',
//   //                 icon: 'error',
//   //               });
//   //             } else {
//   //               errors = [{ message: 'Something went wrong' }];
//   //             }
//   //             return of(new StartBookingFail(errors), new StopLoader());
//   //           })
//   //         )
//   //     )
//   //   );
//   // });

// }
