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

export const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) return;

  token.set(persistedToken);
  dispatch(getCurrentUserRequest());

  try {
    const { data } = await axios.get('/user/me');
    dispatch(getCurrentUserSuccess(data));

    return data;
  } catch (error) {
    dispatch(getCurrentUserError(error.message));
  }
};
