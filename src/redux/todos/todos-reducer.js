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
  getByQueryRequest,
  getByQuerySuccess,
  getByQueryError,
  setFilterValue,
  setDateValue,
} from './todos-actions';
import { logoutSuccess } from 'redux/auth/auth-actions';

const items = createReducer([], {
  [getByQuerySuccess]: (_, { payload }) => payload.tasks,

  [addTodoSuccess]: (state, { payload }) => [...state, payload],
  [deleteTodoSuccess]: (state, { payload }) =>
    state.filter(({ _id }) => _id !== payload),
  [updateTodoSuccess]: (state, { payload }) =>
    state.map(item => (item._id === payload._id ? payload : item)),

  [logoutSuccess]: () => [],
});

const itemsLength = createReducer(null, {
  [getByQuerySuccess]: (_, { payload }) => payload.totalTodos,

  [addTodoSuccess]: (state, _) => state + 1,
  [deleteTodoSuccess]: (state, _) => state - 1,

  [logoutSuccess]: () => null,
});

const itemsForPagination = createReducer(null, {
  // [getByStatusSuccess]: (_, { payload }) => payload.totalByStatus,
  // [getByPageSuccess]: (_, { payload }) => payload.totalByStatus,

  [getByQuerySuccess]: (_, { payload }) => payload.countOfResults,

  [addTodoSuccess]: (state, _) => state + 1,
  [deleteTodoSuccess]: (state, _) => state - 1,

  [logoutSuccess]: () => null,
});

const completeItems = createReducer(null, {
  [getByQuerySuccess]: (_, { payload }) => payload.totalCompleted,
  [addTodoSuccess]: (state, { payload }) =>
    payload.isDone ? state + 1 : state,
  [updateTodoSuccess]: (state, { payload }) =>
    payload.isDone ? state + 1 : state - 1,

  [logoutSuccess]: () => null,
});

const notCompleteItems = createReducer(null, {
  [getByQuerySuccess]: (_, { payload }) => payload.totalNotCompleted,
  [addTodoSuccess]: (state, { payload }) =>
    payload.isDone ? state : state + 1,
  [updateTodoSuccess]: (state, { payload }) =>
    payload.isDone ? state - 1 : state + 1,

  [logoutSuccess]: () => null,
});

const filterValue = createReducer('', {
  [setFilterValue]: (_, { payload }) => payload,

  [logoutSuccess]: () => [],
});

const dateValue = createReducer('', {
  [setDateValue]: (_, { payload }) => payload,

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

  [getByQueryRequest]: () => true,
  [getByQuerySuccess]: () => false,
  [getByQueryError]: () => false,
});

const setError = (_, { payload }) => payload;
const error = createReducer(null, {
  [addTodoError]: setError,
  [addTodoRequest]: () => null,
  [deleteTodoError]: setError,
  [deleteTodoRequest]: () => null,
  [updateTodoError]: setError,
  [updateTodoRequest]: () => null,
});

export default combineReducers({
  items,
  itemsLength,
  itemsForPagination,
  completeItems,
  notCompleteItems,
  filterValue,
  dateValue,

  isLoading,
  error,
});
