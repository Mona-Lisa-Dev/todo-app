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
  createErrorMessage,
} from './auth-actions';

import { store } from 'redux/store';
const { dispatch } = store;

// axios.defaults.baseURL = 'https://api-nodejs-todolist.herokuapp.com';
axios.defaults.baseURL = 'https://restapi-todos.herokuapp.com/api';

axios.interceptors.response.use(
  response =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  error => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        console.log('Error!', error);
        dispatch(createErrorMessage(error));
        reject(error);
      });
    }

    if (error.response.status) {
      dispatch(createErrorMessage(error.response.data.message));
      console.log('Error!', error.response.data.message);
    } else {
      return new Promise((resolve, reject) => {
        dispatch(createErrorMessage(error.response.data.message));
        console.log('Error!', error.response.data.message);

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
    // const { data } = await axios.post('/user/register', payload);
    const {
      data: { data },
    } = await axios.post('/users/signup', payload);
    console.log('sign up', data);
    dispatch(signupSuccess(data));

    dispatch(loginRequest());

    try {
      const { email, password } = payload;
      const {
        data: { data },
      } = await axios.post('/users/login', { email, password });
      dispatch(loginSuccess(data));
      token.set(data.token);
      // console.log('log in', data);
      return data;
    } catch (error) {
      dispatch(loginError(error.message));
    }

    return data;
  } catch (error) {
    dispatch(signupError(error.message));
  }
};

export const login = payload => async dispatch => {
  dispatch(loginRequest());

  try {
    // const { data } = await axios.post('/user/login', payload);
    const {
      data: { data },
    } = await axios.post('/users/login', payload);

    dispatch(loginSuccess(data));
    token.set(data.token);
    console.log('log in', data);
    return data;
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

export const logout = () => async dispatch => {
  dispatch(logoutRequest());

  try {
    // await axios.post(`/user/logout`);
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
    // const { data } = await axios.get('/user/me');
    const { data } = await axios.get('/users/current');

    dispatch(getCurrentUserSuccess(data));

    return data;
  } catch (error) {
    dispatch(getCurrentUserError(error.message));
  }
};
