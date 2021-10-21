import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { ThemeContext } from 'Context';
import { Clear } from 'icons/Clear';
import styles from './UIIconBtn.module.scss';

const UIIconBtn = ({
  icon: Icon = Clear,
  label = '',
  title = '',
  type = 'button',
  onClick,
  classNameForm = 'square',
  disabled = false,
}) => {
  const intl = useIntl();
  const theme = useContext(ThemeContext);

  const classNameTheme = theme === 'light' ? 'light' : 'dark';
  const classNameBtn = `${styles.iconBtn} ${styles[classNameForm]} ${styles[classNameTheme]}`;

  return (
    <button
      className={classNameBtn}
      aria-label={label}
      type={type}
      title={title && intl.formatMessage({ id: title })}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon />
    </button>
  );
};

UIIconBtn.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  classNameForm: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default UIIconBtn;
