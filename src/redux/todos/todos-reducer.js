import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  addTodoRequest,
  addTodoSuccess,
  addTodoError,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoError,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoError,
  // getTodosRequest,
  // getTodosSuccess,
  // getTodosError,
  getByPageRequest,
  getByPageSuccess,
  getByPageError,
} from './todos-actions';
import { logoutSuccess } from 'redux/auth/auth-actions';

const items = createReducer([], {
  // [getTodosSuccess]: (_, { payload }) => payload.tasks,
  [getByPageSuccess]: (_, { payload }) => payload.tasks,
  [addTodoSuccess]: (state, { payload }) => [...state, payload],
  [deleteTodoSuccess]: (state, { payload }) =>
    state.filter(({ _id }) => _id !== payload),
  [updateTodoSuccess]: (state, { payload }) =>
    state.map(item => (item._id === payload._id ? payload : item)),

  [logoutSuccess]: () => [],
});

// const itemsByPage = createReducer([], {
//   [getByPageSuccess]: (_, { payload }) => payload.tasks,

//   [logoutSuccess]: () => [],
// });

const itemsByPageLength = createReducer(null, {
  [getByPageSuccess]: (_, { payload }) => payload.total,
  [addTodoSuccess]: (state, { payload }) => state + 1,
  [deleteTodoSuccess]: (state, { payload }) => state - 1,
});

const setError = (_, { payload }) => payload;
const error = createReducer(null, {
  // [getTodosError]: setError,
  // [getTodosRequest]: () => null,
  [addTodoError]: setError,
  [addTodoRequest]: () => null,
  [deleteTodoError]: setError,
  [deleteTodoRequest]: () => null,
  [updateTodoError]: setError,
  [updateTodoRequest]: () => null,
  [getByPageError]: setError,
  [getByPageRequest]: () => null,
});

export default combineReducers({
  items,
  // itemsByPage,
  itemsByPageLength,
  error,
});
