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
    // const {
    //   data: { data },
    // } = await axios.post('/task', todo);
    const {
      data: { data },
    } = await axios.post('/tasks', todo);

    dispatch(addTodoSuccess(data.task));
    return data.task;
  } catch (error) {
    dispatch(addTodoError(error.message));
  }
};

export const deleteTodo = todoId => async dispatch => {
  dispatch(deleteTodoRequest());

  try {
    // await axios.delete(`/task/${todoId}`);
    await axios.delete(`/tasks/${todoId}`);

    dispatch(deleteTodoSuccess(todoId));
  } catch (error) {
    dispatch(deleteTodoError(error.message));
  }
};

export const updateTodo = (id, updatedTodo) => async dispatch => {
  dispatch(updateTodoRequest());

  try {
    // const {
    //   data: { data },
    // } = await axios.put(`/task/${id}`, updatedTodo);
    const {
      data: { data },
    } = await axios.put(`/tasks/${id}`, updatedTodo);

    dispatch(updateTodoSuccess(data));
    return data;
  } catch (error) {
    dispatch(updateTodoError(error.message));
  }
};

export const getAllTodos = () => async dispatch => {
  dispatch(getTodosRequest());

  try {
    // const {
    //   data: { data },
    // } = await axios.get('/task');
    const {
      data: { data },
    } = await axios.get('/tasks');

    dispatch(getTodosSuccess(data));
    return data;
  } catch (error) {
    dispatch(getTodosError(error.message));
  }
};

export const getTodosByPage =
  (limit, offset, page = 1) =>
  async dispatch => {
    dispatch(getByPageRequest());

    try {
      // const {
      //   data: { data },
      // } = await axios.get(`/task?limit=${limit}&skip=${skip}`);
      const {
        data: {
          data: { tasks },
        },
      } = await axios.get(
        `/tasks?limit=${limit}&offset=${offset}&page=${page}}`,
      );
      dispatch(getByPageSuccess(tasks));
      return tasks;
    } catch (error) {
      dispatch(getByPageError(error.message));
    }
  };
