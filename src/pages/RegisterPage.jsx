import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import RegisterForm from 'components/RegisterForm';
import Loader from 'components/Loader';
import AlertError from 'components/AlertError';

import { getLoadingUser } from 'redux/auth/auth-selectors';
import { getErrorMessage } from 'redux/error/error-selectors';
import { clearError } from 'redux/error/error-action';

const RegisterPage = () => {
  const error = useSelector(getErrorMessage);
  const isLoadingUser = useSelector(getLoadingUser);

  const dispatch = useDispatch();
  useEffect(() => dispatch(clearError()), [dispatch]);

  return (
    <>
      {error && <AlertError error={error} />}
      {isLoadingUser && <Loader />}
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
