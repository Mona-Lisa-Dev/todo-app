import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  signupRequest,
  signupSuccess,
  signupError,
  loginRequest,
  loginSuccess,
  loginError,
} from './auth-actions';

const initialUserState = { name: null, email: null, age: null };

const user = createReducer(initialUserState, {
  [signupSuccess]: (_, { payload }) => payload.user,
  [loginSuccess]: (_, { payload }) => payload.user,
});

const token = createReducer(null, {
  //   [signupSuccess]: (_, { payload }) => payload.token,
  [loginSuccess]: (_, { payload }) => payload.token,
});

const isAuthorized = createReducer(false, {
  //   [signupSuccess]: () => true,
  [loginSuccess]: () => true,

  [signupError]: () => false,
  [loginError]: () => false,
});

export default combineReducers({
  user,
  token,
  isAuthorized,
});
