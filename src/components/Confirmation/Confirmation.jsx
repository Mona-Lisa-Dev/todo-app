import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Close, DeleteForever } from '@mui/icons-material';

import { translate } from 'i18n';
import styles from './Confirmation.module.scss';

const Confirmation = ({ open, onClose, onDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className={styles.confirmation}>
        <DialogTitle id="alert-dialog-title">
          {translate('confirm_delete_title')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {translate('confirm_delete_text')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            variant="contained"
            color="primary"
            endIcon={<Close>Close</Close>}
            autoFocus
          >
            {translate('cancel')}
          </Button>
          <Button
            onClick={onDelete}
            variant="contained"
            color="primary"
            endIcon={<DeleteForever>Delete</DeleteForever>}
          >
            {translate('delete')}
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

Confirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Confirmation;
