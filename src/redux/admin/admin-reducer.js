import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersError,
} from './admin-actions';

import {
  loginSuccess,
  logoutSuccess,
  getCurrentUserSuccess,
} from '../auth/auth-actions';

const users = createReducer([], {
  [getAllUsersSuccess]: (_, { payload }) => payload,

  [logoutSuccess]: () => [],
});

const isAdmin = createReducer(false, {
  // todo: міняється на тру тільки якщо зайшов адмін
  [getAllUsersSuccess]: () => true,

  [getAllUsersRequest]: () => false,
  [getAllUsersError]: () => false,

  [loginSuccess]: (_, { payload }) =>
    payload.user.role === 'admin' ? true : false,
  [getCurrentUserSuccess]: (_, { payload }) =>
    payload.user.role === 'admin' ? true : false,

  [logoutSuccess]: () => false,
});

export default combineReducers({
  users,
  isAdmin,
});
