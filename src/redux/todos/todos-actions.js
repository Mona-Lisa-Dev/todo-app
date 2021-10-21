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

export const getByQueryRequest = createAction('todos/getByQueryRequest');
export const getByQuerySuccess = createAction('todos/getByQuerySuccess');
export const getByQueryError = createAction('todos/getByQueryError');

export const setFilterValue = createAction('todos/setFilterValue');
export const setDateValue = createAction('todos/setDateValue');
