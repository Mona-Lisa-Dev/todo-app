import axios from 'axios';

import {
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersError,
  getAllTasksRequest,
  getAllTasksSuccess,
  getAllTasksError,
  getUserByIdRequest,
  getUserByIdSuccess,
  getUserByIdError,
  createUserRequest,
  createUserSuccess,
  createUserError,
  updateUserByAdminRequest,
  updateUserByAdminSuccess,
  updateUserByAdminError,
  updateCompletedRequest,
  updateCompletedSuccess,
  updateCompletedError,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserError,
} from './admin-actions';

import {
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoError,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoError,
} from '../todos/todos-actions';

export const getUsers = () => async dispatch => {
  dispatch(getAllUsersRequest());

  try {
    const {
      data: {
        data: { users },
      },
    } = await axios.get('/admin/users');
    dispatch(getAllUsersSuccess(users));

    return users;
  } catch (error) {
    dispatch(getAllUsersError(error.message));
  }
};

export const getUserById = id => async dispatch => {
  dispatch(getUserByIdRequest());

  try {
    const {
      data: { data },
    } = await axios.get(`/admin/users/${id}`);
    dispatch(getUserByIdSuccess(data.user));
    return data.user;
  } catch (error) {
    dispatch(getUserByIdError(error.message));
  }
};

export const createUser = user => async dispatch => {
  dispatch(createUserRequest());

  try {
    const {
      data: { data },
    } = await axios.post('/admin/users', user);

    dispatch(createUserSuccess(data.user));
    return data.user;
  } catch (error) {
    dispatch(createUserError(error.message));
  }
};

export const deleteUser = id => async dispatch => {
  dispatch(deleteUserRequest());

  try {
    await axios.delete(`/admin/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserError(error.message));
  }
};

export const updateUser = (id, updatedUser) => async dispatch => {
  dispatch(updateUserByAdminRequest());

  try {
    const {
      data: { data },
    } = await axios.put(`/admin/users/${id}`, updatedUser);
    dispatch(updateUserByAdminSuccess(data.user));
    return data.user;
  } catch (error) {
    dispatch(updateUserByAdminError(error.message));
  }
};

export const updateCompleted = (id, updatedCompleted) => async dispatch => {
  dispatch(updateCompletedRequest());

  try {
    const {
      data: { data },
    } = await axios.patch(`/admin/users/${id}/completed`, updatedCompleted);
    dispatch(updateCompletedSuccess(data.user));
    return data.user;
  } catch (error) {
    dispatch(updateCompletedError());
  }
};

export const getTasks = () => async dispatch => {
  dispatch(getAllTasksRequest());

  try {
    const {
      data: {
        data: { tasks },
      },
    } = await axios.get('/admin/tasks');
    dispatch(getAllTasksSuccess(tasks));

    return tasks;
  } catch (error) {
    dispatch(getAllTasksError(error.message));
  }
};

export const deleteTaskByAdmin = (ownerId, taskId) => async dispatch => {
  dispatch(deleteTodoRequest());

  try {
    await axios.delete(`/admin/tasks/${ownerId}/${taskId}`);
    dispatch(deleteTodoSuccess(taskId));
  } catch (error) {
    dispatch(deleteTodoError(error.message));
  }
};

export const updateTodoByAdmin =
  (ownerId, taskId, updatedTodo) => async dispatch => {
    dispatch(updateTodoRequest());

    try {
      const {
        data: { data },
      } = await axios.put(`/admin/tasks/${ownerId}/${taskId}`, updatedTodo);
      dispatch(updateTodoSuccess(data.task));
      return data.task;
    } catch (error) {
      dispatch(updateTodoError(error.message));
    }
  };
