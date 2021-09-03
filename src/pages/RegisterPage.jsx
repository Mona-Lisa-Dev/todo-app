import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import RegisterForm from 'components/RegisterForm';
import Loader from 'components/Loader';
import AlertError from 'components/AlertError';

import { getErrorMessage, getLoadingUser } from 'redux/auth/auth-selectors';
import { clearError } from 'redux/auth/auth-actions';

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
