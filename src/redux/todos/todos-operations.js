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
  getByPageRequest,
  getByPageSuccess,
  getByPageError,
} from './todos-actions';

export const addTodo = todo => async dispatch => {
  dispatch(addTodoRequest());

  try {
    const {
      data: { data },
    } = await axios.post('/task', todo);
    dispatch(addTodoSuccess(data));
    return data;
  } catch (error) {
    dispatch(addTodoError(error.message));
  }
};

export const deleteTodo = todoId => async dispatch => {
  dispatch(deleteTodoRequest());

  try {
    await axios.delete(`/task/${todoId}`);
    dispatch(deleteTodoSuccess(todoId));
  } catch (error) {
    dispatch(deleteTodoError(error.message));
  }
};

export const updateTodo = (id, updatedTodo) => async dispatch => {
  dispatch(updateTodoRequest());

  try {
    const {
      data: { data },
    } = await axios.put(`/task/${id}`, updatedTodo);
    dispatch(updateTodoSuccess(data));
    return data;
  } catch (error) {
    dispatch(updateTodoError(error.message));
  }
};

export const getAllTodos = () => async dispatch => {
  dispatch(getTodosRequest());

  try {
    const {
      data: { data },
    } = await axios.get('/task');
    dispatch(getTodosSuccess(data));
    return data;
  } catch (error) {
    dispatch(getTodosError(error.message));
  }
};

export const getTodosByPage = (limit, skip) => async dispatch => {
  dispatch(getByPageRequest());

  try {
    const {
      data: { data },
    } = await axios.get(`/task?limit=${limit}&skip=${skip}`);
    dispatch(getByPageSuccess(data));
    return data;
  } catch (error) {
    dispatch(getByPageError(error.message));
  }
};
