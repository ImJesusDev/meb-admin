import { LoaderActionTypes } from './loader.actions';

export interface State {
  isOn: boolean;
}

export const initialState: State = {
  isOn: false,
};

export function reducer(state = { isOn: false }, action: any): State {
  switch (action.type) {
    case LoaderActionTypes.StartLoader: {
      return {
        isOn: true,
      };
    }

    case LoaderActionTypes.StopLoader: {
      return {
        isOn: false,
      };
    }

    default:
      return state;
  }
}
