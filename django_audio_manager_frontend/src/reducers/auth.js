import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGGING_IN,
  LOGOUT
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('isAuthenticated')
    ? localStorage.getItem('isAuthenticated').toLowerCase() == 'true'
    : false,
  username: localStorage.getItem('username')
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
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('username', action.username);
      return {
        ...state,
        isAuthenticated: true,
        username: action.username
      };
    case LOGGING_IN:
      return state;
    case LOGOUT:
      localStorage.setItem('isAuthenticated', false);
      localStorage.setItem('username', null);
      return {
        ...state,
        isAuthenticated: false,
        username: null
      };

    default:
      return state;
  }
}
