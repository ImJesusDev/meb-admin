import { BookingFilters } from './../../../models/booking';
import { Action } from '@ngrx/store';
/* Models */
import { ApiError } from '@models/api-error';
import { Booking } from '@models/booking';


/* Enum to specify all Booking actions */
export enum BookingActionTypes {
  LoadBooking = '[Booking] Load Bookings',
  LoadBookingSuccess = '[Booking] Load Bookings Success',
  LoadBookingFail = '[Booking] Load Bookings Fail'
}

// Load Bookings
export class LoadBooking implements Action {
  readonly type = BookingActionTypes.LoadBooking;
}
// Load Success
export class LoadBookingSuccess implements Action {
  readonly type = BookingActionTypes.LoadBookingSuccess;
  constructor(public payload: any) { }
}
// Load Fail
export class LoadBookingFail implements Action {
  readonly type = BookingActionTypes.LoadBookingFail;
  constructor(public payload: ApiError[]) { }
}


/* Export all actions */
export type BookingActions =
  | LoadBooking
  | LoadBookingSuccess
  | LoadBookingFail;
