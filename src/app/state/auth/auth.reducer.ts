import { AuthActionTypes } from './auth.actions';

export interface State {
  isLogged: boolean;
}

export const initialState: State = {
  isLogged: false,
};

export function reducer(state = { isLogged: false }, action: any): State {
  switch (action.type) {
    case AuthActionTypes.LoginStart: {
      return {
        isLogged: false,
      };
    }
    case AuthActionTypes.LoginSuccess: {
      return {
        isLogged: true,
      };
    }
    case AuthActionTypes.SetAuth: {
      return {
        isLogged: true,
      };
    }

    case AuthActionTypes.LogOut: {
      return {
        isLogged: false,
      };
    }

    default:
      return state;
  }
}
