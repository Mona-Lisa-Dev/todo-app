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
  getByQueryRequest,
  getByQuerySuccess,
  getByQueryError,
} from './todos-actions';

export const addTodo = todo => async dispatch => {
  dispatch(addTodoRequest());

  try {
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
    await axios.delete(`/tasks/${todoId}`);
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
    } = await axios.put(`/tasks/${id}`, updatedTodo);
    dispatch(updateTodoSuccess(data.task));
    return data.task;
  } catch (error) {
    dispatch(updateTodoError(error.message));
  }
};

export const getTodos =
  (limit, offset = 0, status, sort, query = '', date = null) =>
  async dispatch => {
    dispatch(getByQueryRequest());

    try {
      const {
        data: {
          data: { tasks },
        },
      } = await axios.get(
        `/tasks?limit=${limit}&offset=${offset}&isDone=${status}&${sort}=description&query=${query}&date=${date}`,
      );
      dispatch(getByQuerySuccess(tasks));
      return tasks;
    } catch (error) {
      dispatch(getByQueryError(error.message));
    }
  };
