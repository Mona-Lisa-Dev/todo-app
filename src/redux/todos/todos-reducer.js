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
  getByPageRequest,
  getByPageSuccess,
  getByPageError,
  getByQueryRequest,
  getByQuerySuccess,
  getByQueryError,
  getByStatusRequest,
  getByStatusSuccess,
  getByStatusError,
  clearFilter,
  getForChartRequest,
  getForChartSuccess,
  getForChartError,
} from './todos-actions';
import { logoutSuccess } from 'redux/auth/auth-actions';

const items = createReducer([], {
  [getByPageSuccess]: (_, { payload }) => payload.tasks,
  [getByStatusSuccess]: (_, { payload }) => payload.tasks,

  [addTodoSuccess]: (state, { payload }) => [...state, payload],
  [deleteTodoSuccess]: (state, { payload }) =>
    state.filter(({ _id }) => _id !== payload),
  [updateTodoSuccess]: (state, { payload }) =>
    state.map(item => (item._id === payload._id ? payload : item)),

  [logoutSuccess]: () => [],
});

const itemsLength = createReducer(null, {
  [getByPageSuccess]: (_, { payload }) => payload.total,
  [addTodoSuccess]: (state, { payload }) => state + 1,
  [deleteTodoSuccess]: (state, { payload }) => state - 1,
});

const itemsForPagination = createReducer(null, {
  [getByStatusSuccess]: (_, { payload }) => payload.total,
  [getByPageSuccess]: (_, { payload }) => payload.total,
  [addTodoSuccess]: (state, { payload }) => state + 1,
  [deleteTodoSuccess]: (state, { payload }) => state - 1,
});

const completeItems = createReducer(null, {
  [getForChartSuccess]: (_, { payload }) => payload.total,
});

const filter = createReducer([], {
  [getByQuerySuccess]: (_, { payload }) => payload,
  [getByQueryError]: () => [],
  [clearFilter]: () => [],

  [deleteTodoSuccess]: (state, { payload }) =>
    state.filter(({ _id }) => _id !== payload),
  [updateTodoSuccess]: (state, { payload }) =>
    state.map(item => (item._id === payload._id ? payload : item)),

  [logoutSuccess]: () => [],
});

const isLoading = createReducer(false, {
  [addTodoRequest]: () => true,
  [addTodoSuccess]: () => false,
  [addTodoError]: () => false,

  [deleteTodoRequest]: () => true,
  [deleteTodoSuccess]: () => false,
  [deleteTodoError]: () => false,

  [updateTodoRequest]: () => true,
  [updateTodoSuccess]: () => false,
  [updateTodoError]: () => false,

  [getByPageRequest]: () => true,
  [getByPageSuccess]: () => false,
  [getByPageError]: () => false,

  [getByQueryRequest]: () => true,
  [getByQuerySuccess]: () => false,
  [getByQueryError]: () => false,

  [getByStatusRequest]: () => true,
  [getByStatusSuccess]: () => false,
  [getByStatusError]: () => false,

  [getForChartRequest]: () => true,
  [getForChartSuccess]: () => false,
  [getForChartError]: () => false,
});

const setError = (_, { payload }) => payload;
const error = createReducer(null, {
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
  itemsLength,
  itemsForPagination,
  completeItems,
  filter,
  isLoading,
  error,
});
