import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { Close, DeleteForever } from '@material-ui/icons';

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
          {/* {'Are you sure you want to delete this task?'} */}
          {translate('confirm_delete_title')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* You'll not be able to restore this task if you delete it. */}
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
            {/* Cancel */}
            {translate('cancel')}
          </Button>
          <Button
            onClick={onDelete}
            variant="contained"
            color="primary"
            endIcon={<DeleteForever>Delete</DeleteForever>}
          >
            {/* Delete */}
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
