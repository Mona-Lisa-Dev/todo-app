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
  [getByPageSuccess]: (_, { payload }) => payload.totalTodos,
  [getByStatusSuccess]: (_, { payload }) => payload.totalTodos,
  [addTodoSuccess]: (state, _) => state + 1,
  [deleteTodoSuccess]: (state, _) => state - 1,

  [logoutSuccess]: () => null,
});

const itemsForPagination = createReducer(null, {
  [getByStatusSuccess]: (_, { payload }) => payload.totalByStatus,
  [getByPageSuccess]: (_, { payload }) => payload.totalByStatus,
  [addTodoSuccess]: (state, _) => state + 1,
  [deleteTodoSuccess]: (state, _) => state - 1,

  [logoutSuccess]: () => null,
});

const completeItems = createReducer(null, {
  [getByPageSuccess]: (_, { payload }) => payload.totalCompleted,
  [getByStatusSuccess]: (_, { payload }) => payload.totalCompleted,
  [addTodoSuccess]: (state, { payload }) =>
    payload.isDone ? state + 1 : state,
  [updateTodoSuccess]: (state, { payload }) =>
    payload.isDone ? state + 1 : state - 1,

  [logoutSuccess]: () => null,
});

const notCompleteItems = createReducer(null, {
  [getByPageSuccess]: (_, { payload }) => payload.totalNotCompleted,
  [getByStatusSuccess]: (_, { payload }) => payload.totalNotCompleted,
  [addTodoSuccess]: (state, { payload }) =>
    payload.isDone ? state : state + 1,
  [updateTodoSuccess]: (state, { payload }) =>
    payload.isDone ? state - 1 : state + 1,

  [logoutSuccess]: () => null,
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
  notCompleteItems,
  filter,
  isLoading,
  error,
});
