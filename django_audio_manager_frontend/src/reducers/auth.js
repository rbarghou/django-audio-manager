import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGGING_IN,
  LOGOUT,
  REGISTER,
  VERIFY_REGISTRATION,
  VERIFY_REGISTRATION_FAILED,
  GETTING_PROFILE,
  RECEIVED_PROFILE
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  username: null,
  firstname: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        username: action.username
      };
    case LOGGING_IN:
      return state;
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        username: null
      };
    case REGISTER:
      return state;
    case VERIFY_REGISTRATION:
      return state;
    case VERIFY_REGISTRATION_FAILED:
      return state;
    case GETTING_PROFILE:
      return state;
    case RECEIVED_PROFILE:
      return {
        ...state,
        username: action.username,
        firstname: action.firstname,
        lastname: action.lastname,
        email: action.email,
        isAuthenticated: action.is_authenticated
      };
    default:
      return state;
  }
}
