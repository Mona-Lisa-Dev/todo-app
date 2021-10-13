import { useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Clear } from 'icons/Clear';
import UIIconBtn from 'components/UI/UIIconBtn';
import { ThemeContext } from 'Context';

import styles from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
  const theme = useContext(ThemeContext);
  const classNameModal =
    theme === 'light'
      ? `${styles.modal} ${styles.lightModal}`
      : `${styles.modal} ${styles.darkModal}`;

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
        <div className={styles.closeButton}>
          <UIIconBtn
            icon={Clear}
            label="Close modal"
            title="close_modal"
            type="button"
            onClick={onClose}
            classNameForm="round"
          />
        </div>
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
