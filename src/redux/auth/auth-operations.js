import axios from 'axios';
import {
  signupRequest,
  signupSuccess,
  signupError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
} from './auth-actions';
import { createErrorMessage } from 'redux/error/error-action';

import { store } from 'redux/store';
const { dispatch } = store;

axios.defaults.baseURL = 'https://restapi-todos.herokuapp.com/api';

axios.interceptors.response.use(
  response =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  error => {
    const errorMessage = 'Something is wrong. Try again!';
    if (!error.response) {
      return new Promise((resolve, reject) => {
        dispatch(createErrorMessage(error) || errorMessage);
        reject(error);
      });
    }

    if (error.response.status) {
      if (
        error.response.data.message !== 'Not authorized' &&
        error.response.status !== 500 &&
        error.response.data.message !== 'Id Is Not Valid'
      ) {
        dispatch(
          createErrorMessage(error.response.data.message || errorMessage),
        );
      }
    } else {
      return new Promise((resolve, reject) => {
        dispatch(
          createErrorMessage(error.response.data.message || errorMessage),
        );
        reject(error);
      });
    }
  },
);

const token = {
  set(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common['Authorization'] = '';
  },
};

export const signup = payload => async dispatch => {
  dispatch(signupRequest());

  try {
    const {
      data: { data },
    } = await axios.post('/users/signup', payload);
    dispatch(signupSuccess(data));

    const { email, password } = payload;
    const user = { email, password };
    dispatch(login(user));

    return data;
  } catch (error) {
    dispatch(signupError(error.message));
  }
};

export const login = payload => async dispatch => {
  dispatch(loginRequest());

  try {
    const {
      data: { data },
    } = await axios.post('/users/login', payload);

    token.set(data.token);
    dispatch(loginSuccess(data));
    return data;
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

export const logout = () => async dispatch => {
  dispatch(logoutRequest());

  try {
    await axios.post(`/users/logout`);

    dispatch(logoutSuccess());
    token.unset();
  } catch (error) {
    dispatch(logoutError(error.message));
  }
};

export const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) return;

  token.set(persistedToken);
  dispatch(getCurrentUserRequest());

  try {
    const { data } = await axios.get('/users/current');

    dispatch(getCurrentUserSuccess(data));
    return data;
  } catch (error) {
    dispatch(getCurrentUserError(error.message));
  }
};
