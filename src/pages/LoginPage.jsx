import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoginForm from 'components/LoginForm';
import Loader from 'components/Loader';
import AlertError from 'components/AlertError';

import { getLoadingUser } from 'redux/auth/auth-selectors';
import { getErrorMessage } from 'redux/error/error-selectors';
import { clearError } from 'redux/error/error-action';

const LoginPage = () => {
  const error = useSelector(getErrorMessage);
  const isLoadingUser = useSelector(getLoadingUser);

  const dispatch = useDispatch();
  useEffect(() => dispatch(clearError()), [dispatch]);

  return (
    <>
      {error && <AlertError error={error} />}
      {isLoadingUser && <Loader />}
      <LoginForm />
    </>
  );
};

export default LoginPage;
