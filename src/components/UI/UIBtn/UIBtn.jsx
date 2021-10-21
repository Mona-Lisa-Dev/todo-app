import { useContext } from 'react';
import PropTypes from 'prop-types';

import { translate } from 'i18n';
import { ThemeContext } from 'Context';
import styles from './UIBtn.module.scss';

const UIBtn = ({
  text = '',
  type = 'button',
  onClick,
  classNameForm = 'contained',
  icon: Icon = null,
  ...rest
}) => {
  const theme = useContext(ThemeContext);

  const classNameTheme = theme === 'light' ? 'light' : 'dark';
  const classNameBtn = `${styles.btn} ${styles[classNameForm]} ${styles[classNameTheme]}`;

  return (
    <button {...rest} className={classNameBtn} type={type} onClick={onClick}>
      {text && translate(text)}
      {Icon && <Icon />}
    </button>
  );
};

UIBtn.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  classNameForm: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default UIBtn;
