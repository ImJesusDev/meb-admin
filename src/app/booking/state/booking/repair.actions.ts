import { Action } from '@ngrx/store';
/* Models */
import { ApiError } from '@models/api-error';
import { Resource } from '@models/inventory';


/* Enum to specify all booking actions */
export enum BookingActionTypes {
  CreateBooking = '[Booking] Create booking',
  CreateBookingSuccess = '[Booking] Create booking success',
  CreateBookingFail = '[Booking] Create booking fail',
  UpdateBooking = '[Booking] Update booking',
  UpdateBookingSuccess = '[Booking] Update booking success',
  UpdateBookingFail = '[Booking] Update booking fail',
  StartBooking = '[Booking] Start booking',
  StartBookingSuccess = '[Booking] Start booking success',
  StartBookingFail = '[Booking] Start booking fail',
}


/**
 * booking
 */

// Create booking
export class CreateBooking implements Action {
  readonly type = BookingActionTypes.CreateBooking;
  constructor(public payload: { resourceId: string }) { }
}

// Create booking Success
export class CreateBookingSuccess implements Action {
  readonly type = BookingActionTypes.CreateBookingSuccess;
  constructor(public payload: Resource) { }
}

// Create booking Fail
export class CreateBookingFail implements Action {
  readonly type = BookingActionTypes.CreateBookingFail;
  constructor(public payload: ApiError[]) { }
}


// Update booking
export class UpdateBooking implements Action {
  readonly type = BookingActionTypes.UpdateBooking;
  constructor(public payload: { resourceId: string, data: any }) { }
}

// Update booking Success
export class UpdateBookingSuccess implements Action {
  readonly type = BookingActionTypes.UpdateBookingSuccess;
  constructor(public payload: Resource) { }
}

// Update booking Fail
export class UpdateBookingFail implements Action {
  readonly type = BookingActionTypes.UpdateBookingFail;
  constructor(public payload: ApiError[]) { }
}


// Start booking
export class StartBooking implements Action {
  readonly type = BookingActionTypes.StartBooking;
  constructor(public payload: { resourceId: string, bookingId: string }) { }
}

// Start booking Success
export class StartBookingSuccess implements Action {
  readonly type = BookingActionTypes.StartBookingSuccess;
  constructor(public payload: Resource) { }
}

// Start booking Fail
export class StartBookingFail implements Action {
  readonly type = BookingActionTypes.StartBookingFail;
  constructor(public payload: ApiError[]) { }
}


/* Export all actions */
export type bookingActions =
  | CreateBooking
  | CreateBookingSuccess
  | CreateBookingFail
  | UpdateBooking
  | UpdateBookingSuccess
  | UpdateBookingFail
  | StartBooking
  | StartBookingSuccess
  | StartBookingFail;
