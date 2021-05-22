import { AuthActionTypes } from './auth.actions';

export interface State {
  isLogged: boolean;
  error: any;
}

export const initialState: State = {
  isLogged: false,
  error: null,
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case AuthActionTypes.LoginStart: {
      return {
        isLogged: false,
        error: null,
      };
    }
    case AuthActionTypes.LoginSuccess: {
      return {
        isLogged: true,
        error: null,
      };
    }
    case AuthActionTypes.LoginFail: {
      return {
        isLogged: false,
        error: action.payload,
      };
    }
    case AuthActionTypes.SetAuth: {
      return {
        isLogged: true,
        error: null,
      };
    }

    case AuthActionTypes.LogOut: {
      return {
        isLogged: false,
        error: null,
      };
    }

    default:
      return state;
  }
}
