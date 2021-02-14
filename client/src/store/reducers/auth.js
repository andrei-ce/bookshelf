import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_NOT_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types';

const initState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuth: null, // explicitly say it hasn't tried to authenticate yet
  loading: true,
};

export default function (state = initState, action) {
  // Extract type and payload from action
  const { type, payload } = action;

  switch (type) {
    // action to check if user had token in local storage:
    case USER_LOADED:
      return { ...state, isAuth: true, loading: false, user: payload };
    case USER_NOT_LOADED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
      };

    // actions to check for login and registration:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return { ...state, token: payload.token, isAuth: true, loading: false };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
      };
    default:
      return state;
  }
}
