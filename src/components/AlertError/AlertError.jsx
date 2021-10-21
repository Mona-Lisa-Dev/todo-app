import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';

import { clearError } from 'redux/error/error-action';

import styles from './AlertError.module.scss';

const AlertError = ({ error }) => {
  const dispatch = useDispatch();

  const handleClose = () => dispatch(clearError());
  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      handleClose();
    }
  };

  return (
    <div className={styles.alertWrapper} onClick={handleOverlayClick}>
      <Alert
        className={styles.alert}
        variant="filled"
        severity="error"
        onClose={handleClose}
      >
        {error}
      </Alert>
    </div>
  );
};

AlertError.propTypes = {
  error: PropTypes.string.isRequired,
};

export default AlertError;
