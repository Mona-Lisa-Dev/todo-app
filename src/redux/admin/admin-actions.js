import { createAction } from '@reduxjs/toolkit';

export const getAllUsersRequest = createAction('admin/getAllUsersRequest');
export const getAllUsersSuccess = createAction('admin/getAllUsersSuccess');
export const getAllUsersError = createAction('admin/getAllUsersError');
