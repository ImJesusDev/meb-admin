/* NgRxStore */
import { ActionReducerMap } from '@ngrx/store';

/* Global state */
import * as fromRoot from './../../state/state';
/* Clients State */
import * as fromBooking from './booking';
/* Clients Effects */
import { BookingEffects } from './booking/booking.effects';

/* Interface for the client state */
export interface BookingState {
  bookings: fromBooking.State;
}

/* Interface to merge client state with global state */
export interface State extends fromRoot.State {
  booking: BookingState;
}

/* Merge Reducers */
export const reducers: ActionReducerMap<BookingState, any> = {
  bookings: fromBooking.reducer,
};

/* Export Effects */
export const effects: any[] = [BookingEffects];
