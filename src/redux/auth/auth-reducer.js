import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  signupRequest,
  signupSuccess,
  signupError,
  loginRequest,
  loginSuccess,
  loginError,
  clearError,
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

const setError = (_, { payload }) => payload;
const errorSignup = createReducer(null, {
  [signupError]: setError,
  [signupRequest]: () => null,
  [clearError]: () => null,
});

const errorLogin = createReducer(null, {
  [loginError]: setError,
  [loginRequest]: () => null,
  [clearError]: () => null,
});

export default combineReducers({
  user,
  token,
  isAuthorized,
  errorSignup,
  errorLogin,
});
