import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import audio from './audio';

export default combineReducers({
  auth,
  audio,
  errors
});
