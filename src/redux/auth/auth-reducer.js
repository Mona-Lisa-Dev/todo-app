import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  signupRequest,
  signupSuccess,
  signupError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  clearError,
} from './auth-actions';

const initialUserState = { name: null, email: null, age: null };

const user = createReducer(initialUserState, {
  [signupSuccess]: (_, { payload }) => payload.user,
  [loginSuccess]: (_, { payload }) => payload.user,
  [logoutSuccess]: () => initialUserState,
  [logoutError]: () => initialUserState,
  [getCurrentUserSuccess]: (_, { payload }) => payload,
});

const token = createReducer(null, {
  [loginSuccess]: (_, { payload }) => payload.token,
  [logoutSuccess]: () => null,
});

const isAuthorized = createReducer(false, {
  [loginSuccess]: () => true,
  [getCurrentUserSuccess]: () => true,

  [signupError]: () => false,
  [loginError]: () => false,
  [logoutRequest]: () => false,
  [getCurrentUserError]: () => false,
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

const error = createReducer(null, {
  [logoutError]: setError,
  [logoutRequest]: () => null,
  [getCurrentUserError]: setError,
  [getCurrentUserRequest]: () => null,
});

export default combineReducers({
  user,
  token,
  isAuthorized,
  errorSignup,
  errorLogin,
  error,
});
