import { PaginationBooking } from './../../../models/booking';
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
import { BookingService } from '@services/booking.service';
/* Actions */
import {
  LoadBooking,
  LoadBookingSuccess,
  LoadBookingFail,
  BookingActionTypes
} from './booking.actions';

import { StopLoader } from '@state/loader/loader.actions';

/* Models */
import { ApiError, Booking } from '@models/index';

@Injectable()
export class BookingEffects {
  constructor(
    private router: Router,
    private $actions: Actions,
    private _bookingService: BookingService
  ) { }

  $getBookings = createEffect(() => {
    return this.$actions.pipe(
      ofType(BookingActionTypes.LoadBooking),
      switchMap((action: LoadBooking) =>
        this._bookingService
          .getBookings(action.payload)
          .pipe(
            mergeMap((pagination: PaginationBooking) => [
              new StopLoader(),
              new LoadBookingSuccess(pagination.reservations, pagination.page, pagination.totalResults)
            ]),
            catchError((error: HttpErrorResponse) => {
              let errors: ApiError[] = [];
              if (error.error && error.error.errors) {
                errors = error.error.errors;
              } else {
                errors = [{ message: 'Something went wrong' }];
              }
              return of(new LoadBookingFail(errors), new StopLoader());
            })
          )
      )
    );
  });

}
