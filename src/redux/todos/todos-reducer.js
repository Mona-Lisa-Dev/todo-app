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
  getTodosRequest,
  getTodosSuccess,
  getTodosError,
} from './todos-actions';
import { logoutSuccess } from 'redux/auth/auth-actions';

// Todo запрос на add тудушок іде 201, але стейт не обновляється, перевірити редюсер на всі операції

const items = createReducer([], {
  [getTodosSuccess]: (_, { payload }) => payload,
  [addTodoSuccess]: (state, { payload }) => [...state, payload],
  [deleteTodoSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [updateTodoSuccess]: (state, { payload }) =>
    state.map(item => (item.id === payload.id ? payload : item)),

  [logoutSuccess]: () => [],
});

const setError = (_, { payload }) => payload;
const error = createReducer(null, {
  [getTodosError]: setError,
  [getTodosRequest]: () => null,
  [addTodoError]: setError,
  [addTodoRequest]: () => null,
  [deleteTodoError]: setError,
  [deleteTodoRequest]: () => null,
  [updateTodoError]: setError,
  [updateTodoRequest]: () => null,
});

export default combineReducers({
  items,
  error,
});
