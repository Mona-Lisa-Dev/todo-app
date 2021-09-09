import { useDispatch } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

import { clearError } from 'redux/error/error-action';

import styles from './AlertError.module.scss';

const AlertError = ({ error }) => {
  const dispatch = useDispatch();

  return (
    <Alert
      className={styles.alert}
      variant="filled"
      severity="error"
      onClose={() => dispatch(clearError())}
    >
      {error}
    </Alert>
  );
};

export default AlertError;
