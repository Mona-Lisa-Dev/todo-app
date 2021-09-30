import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  // getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersError,
  // getAllTasksRequest,
  getAllTasksSuccess,
  // getAllTasksError,
  // getUserByIdRequest,
  getUserByIdSuccess,
  // getUserByIdError,
  // createUserRequest,
  createUserSuccess,
  // createUserError,
  // updateUserRequest,
  updateUserSuccess,
  // updateUserError,
  // updateCompletedRequest,
  updateCompletedSuccess,
  // updateCompletedError,
  // deleteUserRequest,
  deleteUserSuccess,
  // deleteUserError,
} from './admin-actions';

import {
  addTodoSuccess,
  // deleteTodoRequest,
  deleteTodoSuccess,
  // deleteTodoError,
  // updateTodoRequest,
  updateTodoSuccess,
  // updateTodoError,
} from '../todos/todos-actions';

import { signupSuccess } from '../auth/auth-actions';

import {
  loginSuccess,
  logoutSuccess,
  getCurrentUserSuccess,
} from '../auth/auth-actions';

const users = createReducer([], {
  [getAllUsersSuccess]: (_, { payload }) => payload,

  [createUserSuccess]: (state, { payload }) => [...state, payload],
  [signupSuccess]: (state, { payload }) => [...state, payload],
  [deleteUserSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [updateUserSuccess]: (state, { payload }) =>
    state.map(item => (item.id === payload.id ? payload : item)),
  [updateCompletedSuccess]: (state, { payload }) =>
    state.map(item => (item.id === payload.id ? payload : item)),

  [logoutSuccess]: () => [],
});

const user = createReducer(null, {
  [getUserByIdSuccess]: (_, { payload }) => payload,
});

const tasks = createReducer([], {
  [getAllTasksSuccess]: (_, { payload }) => payload,

  [addTodoSuccess]: (state, { payload }) => [...state, payload],
  [deleteTodoSuccess]: (state, { payload }) =>
    state.filter(({ _id }) => _id !== payload),
  [updateTodoSuccess]: (state, { payload }) =>
    state.map(item => (item._id === payload._id ? payload : item)),

  [logoutSuccess]: () => [],
});

const isAdmin = createReducer(false, {
  [getAllUsersSuccess]: () => true,
  [getAllUsersError]: () => false,

  [loginSuccess]: (_, { payload }) =>
    payload.user.role === 'admin' ? true : false,
  [getCurrentUserSuccess]: (_, { payload }) =>
    payload.user.role === 'admin' ? true : false,

  [logoutSuccess]: () => false,
});

export default combineReducers({
  users,
  user,
  tasks,
  isAdmin,
});
