import axios from 'axios';

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
  getTodosRequest,
  getTodosSuccess,
  getTodosError,
} from './todos-actions';

export const addTodo = todo => async dispatch => {
  dispatch(addTodoRequest());

  try {
    const { data } = await axios.post('/task', todo);
    dispatch(addTodoSuccess(data));
    return data;
  } catch (error) {
    dispatch(addTodoError(error.message));
  }
};

export const deleteTodo = todoId => async dispatch => {
  dispatch(deleteTodoRequest());

  try {
    const { data } = await axios.delete(`/task/${todoId}`);
    dispatch(deleteTodoSuccess(todoId));
    return data;
  } catch (error) {
    dispatch(deleteTodoError(error.message));
  }
};

export const updateTodo = (id, updatedTodo) => async dispatch => {
  dispatch(updateTodoRequest());

  try {
    const { data } = await axios.put(`/task/${id}`, updatedTodo);
    dispatch(updateTodoSuccess(data));
    return data;
  } catch (error) {
    dispatch(updateTodoError(error.message));
  }
};

export const getAllTodos = () => async dispatch => {
  dispatch(getTodosRequest());

  try {
    const { data } = await axios.get('/task');
    dispatch(getTodosSuccess(data));
    return data;
  } catch (error) {
    dispatch(getTodosError(error.message));
  }
};
