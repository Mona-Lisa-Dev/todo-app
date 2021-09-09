import { createAction } from '@reduxjs/toolkit';

export const clearError = createAction('error/clearError');
export const createErrorMessage = createAction('error/createErrorMessage');
