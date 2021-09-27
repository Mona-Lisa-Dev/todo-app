import { useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { ThemeContext } from 'Context';

import styles from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
  const theme = useContext(ThemeContext);
  const classNameModal =
    theme === 'light'
      ? `${styles.modal} ${styles.lightModal}`
      : `${styles.modal} ${styles.darkModal}`;

  const intl = useIntl();

  useEffect(() => {
    const onEscHandler = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onEscHandler);

    return () => {
      window.removeEventListener('keydown', onEscHandler);
    };
  }, [onClose]);

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleOverlayClick}>
      <div className={classNameModal} onClick={e => e.stopPropagation()}>
        <IconButton
          className={styles.closeButton}
          aria-label="Close modal"
          type="button"
          onClick={onClose}
          title={intl.formatMessage({ id: 'close_modal' })}
        >
          <Close />
        </IconButton>
        {children}
      </div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
