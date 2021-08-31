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

// export const getTodosRequest = createAction('todos/getTodosRequest');
// export const getTodosSuccess = createAction('todos/getTodosSuccess');
// export const getTodosError = createAction('todos/getTodosError');

export const getByPageRequest = createAction('todos/getByPageRequest');
export const getByPageSuccess = createAction('todos/getByPageSuccess');
export const getByPageError = createAction('todos/getByPageError');
