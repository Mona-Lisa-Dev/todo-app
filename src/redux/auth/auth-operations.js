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
  async response =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  error => {
    const errorMessage = 'Something is wrong. Try again!';
    if (!error.response) {
      return new Promise((resolve, reject) => {
        // console.log('Error!', error || errorMessage);
        dispatch(createErrorMessage(error) || errorMessage);
        reject(error);
      });
    }

    if (error.response.status) {
      dispatch(createErrorMessage(error.response.data.message || errorMessage));
      // console.log('Error!', error.response.data.message || errorMessage);
    } else {
      return new Promise((resolve, reject) => {
        dispatch(
          createErrorMessage(error.response.data.message || errorMessage),
        );
        // console.log('Error!', error.response.data.message || errorMessage);

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
    // console.log('sign up', data);
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
    // const { data } = await axios.post('/user/login', payload);
    const {
      data: { data },
    } = await axios.post('/users/login', payload);
    token.set(data.token);
    dispatch(loginSuccess(data));

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
