import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import UIBtn from 'components/UI/UIBtn';
import { Clear } from 'icons/Clear';
import { DeleteForever } from 'icons/DeleteForever';
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
          <UIBtn
            classNameForm="contained"
            text="cancel"
            type="button"
            onClick={onClose}
            icon={Clear}
            autoFocus
          />
          <UIBtn
            classNameForm="contained"
            text="delete"
            type="button"
            onClick={onDelete}
            icon={DeleteForever}
          />
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
