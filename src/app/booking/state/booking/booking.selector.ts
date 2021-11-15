/* NgRx Store */
import { createFeatureSelector, createSelector } from '@ngrx/store';
/* Inventory State */
import { BookingState } from '..';
/* Inventory Reducers */
import * as fromBooking from './booking.reducer';

/* Get all state from InventoryState */
export const getBookingstate =
  createFeatureSelector<BookingState>('bookings');

/* Get a portion of the state (inventory) */
export const getBookingsState = createSelector(
  getBookingstate,
  (state) => state.bookings
);
export const getBookingsError = createSelector(
  getBookingstate,
  (state) => state.bookings.error
);

export const getBookings = createSelector(
  getBookingsState,
  fromBooking.selectAll
);
