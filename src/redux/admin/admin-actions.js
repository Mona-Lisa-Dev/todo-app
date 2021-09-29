import { createAction } from '@reduxjs/toolkit';

export const getAllUsersRequest = createAction('admin/getAllUsersRequest');
export const getAllUsersSuccess = createAction('admin/getAllUsersSuccess');
export const getAllUsersError = createAction('admin/getAllUsersError');

export const getAllTasksRequest = createAction('admin/getAllTasksRequest');
export const getAllTasksSuccess = createAction('admin/getAllTasksSuccess');
export const getAllTasksError = createAction('admin/getAllTasksError');

export const getUserByIdRequest = createAction('admin/getUserByIdRequest');
export const getUserByIdSuccess = createAction('admin/getUserByIdSuccess');
export const getUserByIdError = createAction('admin/getUserByIdError');

export const createUserRequest = createAction('admin/createUserRequest');
export const createUserSuccess = createAction('admin/createUserSuccess');
export const createUserError = createAction('admin/createUserError');

export const updateUserRequest = createAction('admin/updateUserRequest');
export const updateUserSuccess = createAction('admin/updateUserSuccess');
export const updateUserError = createAction('admin/updateUserError');

export const updateCompletedRequest = createAction(
  'admin/updateCompletedRequest',
);
export const updateCompletedSuccess = createAction(
  'admin/updateCompletedSuccess',
);
export const updateCompletedError = createAction('admin/updateCompletedError');

export const deleteUserRequest = createAction('admin/deleteUserRequest');
export const deleteUserSuccess = createAction('admin/deleteUserSuccess');
export const deleteUserError = createAction('admin/deleteUserError');
