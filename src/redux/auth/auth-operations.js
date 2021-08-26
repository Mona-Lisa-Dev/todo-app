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
} from './auth-actions';

axios.defaults.baseURL = 'https://api-nodejs-todolist.herokuapp.com';

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
    const { data } = await axios.post('/user/register', payload);
    dispatch(signupSuccess(data));
    console.log('sign up', data);
    return data;
  } catch (error) {
    dispatch(signupError(error.message));
  }
};

export const login = payload => async dispatch => {
  dispatch(loginRequest());

  try {
    const { data } = await axios.post('/user/login', payload);
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
    await axios.post(`/user/logout`);
    dispatch(logoutSuccess());
    token.unset();
  } catch (error) {
    dispatch(logoutError(error.message));
  }
};
