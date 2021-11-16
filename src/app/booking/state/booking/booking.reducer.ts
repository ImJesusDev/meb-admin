/* NgRx Entity */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
/* Actions */
import { BookingActions, BookingActionTypes } from './booking.actions';
/* Models */
import { Booking, ApiError } from '@models/index';

/* Interface for the resources state */
export interface State extends EntityState<any> {
  error: ApiError[];
}

/* Entity adapter */
const adapter: EntityAdapter<Booking> =
  createEntityAdapter<Booking>();

/* Initial client state */
export const initialState: State = adapter.getInitialState({
  error: [],
});

/* Resource reducers */
export function reducer(state = initialState, action: BookingActions): State {
  switch (action.type) {

    case BookingActionTypes.LoadBooking: {
      return adapter.removeAll({
        ...state,
        error: [],
      });
    }
    case BookingActionTypes.LoadBookingSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        error: [],
      });
      //  return adapter.addOne(action.payload, {
      //   ...state,
      //   error: [],
      // });
    }
    case BookingActionTypes.LoadBookingFail: {
      return adapter.removeAll({
        ...state,
        error: action.payload,
      });
    }


    default: {
      return state;
    }
  }
}
/* Export adapter selectors */
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
