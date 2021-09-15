import { createAction } from '@reduxjs/toolkit';

export const addTodoRequest = createAction('todos/addTodoRequest');
export const addTodoSuccess = createAction('todos/addTodoSuccess');
export const addTodoError = createAction('todos/addTodoError');

export const deleteTodoRequest = createAction('todos/deleteTodoRequest');
export const deleteTodoSuccess = createAction('todos/deleteTodoSuccess');
export const deleteTodoError = createAction('todos/deleteTodoError');

export const updateTodoRequest = createAction('todos/updateTodoRequest');
export const updateTodoSuccess = createAction('todos/updateTodoSuccess');
export const updateTodoError = createAction('todos/updateTodoError');

export const getByPageRequest = createAction('todos/getByPageRequest');
export const getByPageSuccess = createAction('todos/getByPageSuccess');
export const getByPageError = createAction('todos/getByPageError');

export const getByStatusRequest = createAction('todos/getByStatusRequest');
export const getByStatusSuccess = createAction('todos/getByStatusSuccess');
export const getByStatusError = createAction('todos/getByStatusError');

export const getByQueryRequest = createAction('todos/getByQueryRequest');
export const getByQuerySuccess = createAction('todos/getByQuerySuccess');
export const getByQueryError = createAction('todos/getByQueryError');

export const getForChartRequest = createAction('todos/getForChartRequest');
export const getForChartSuccess = createAction('todos/getForChartSuccess');
export const getForChartError = createAction('todos/getForChartError');

export const clearFilter = createAction('todos/clearFilter');
