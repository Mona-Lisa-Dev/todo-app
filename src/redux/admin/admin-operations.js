import axios from 'axios';

import {
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersError,
} from './admin-actions';

export const getUsers = () => async dispatch => {
  dispatch(getAllUsersRequest());

  try {
    const {
      data: {
        data: { users },
      },
    } = await axios.get('/admin');
    dispatch(getAllUsersSuccess(users));
    return users;
  } catch (error) {
    dispatch(getAllUsersError(error.message));
  }
};
