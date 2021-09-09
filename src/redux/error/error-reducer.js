import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import { clearError, createErrorMessage } from './error-action';
import {
  signupRequest,
  loginRequest,
  logoutRequest,
} from 'redux/auth/auth-actions';
import {
  addTodoRequest,
  deleteTodoRequest,
  updateTodoRequest,
  getByPageRequest,
  getByQueryRequest,
  clearFilter,
} from 'redux/todos/todos-actions';

const setError = (_, { payload }) => payload;

const isErrorMessage = createReducer('', {
  [createErrorMessage]: setError,
  [signupRequest]: () => null,
  [loginRequest]: () => null,
  [logoutRequest]: () => null,
  [clearError]: () => null,

  [clearFilter]: () => null,
  [addTodoRequest]: () => null,
  [deleteTodoRequest]: () => null,
  [updateTodoRequest]: () => null,
  [getByPageRequest]: () => null,
  [getByQueryRequest]: () => null,
});

export default combineReducers({
  isErrorMessage,
});
