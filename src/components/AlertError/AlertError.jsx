import { useDispatch } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

import { clearError } from 'redux/auth/auth-actions';

import styles from './AlertError.module.scss';

const AlertError = ({ error, onClose = null }) => {
  const dispatch = useDispatch();

  return (
    <Alert
      className={styles.alert}
      variant="filled"
      severity="error"
      onClose={() => {
        onClose ? onClose() : dispatch(clearError());
      }}
    >
      {error}
    </Alert>
  );
};

export default AlertError;
