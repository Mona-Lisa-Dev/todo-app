import { useDispatch } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

import { clearError } from 'redux/auth/auth-actions';

const alerStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  opacity: 0.8,

  height: '80px',
  alignItems: 'center',
};

const AlertError = ({ error, onClose = null }) => {
  const dispatch = useDispatch();

  return (
    <Alert
      style={{ ...alerStyles }}
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
