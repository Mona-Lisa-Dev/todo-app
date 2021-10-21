import { useContext } from 'react';
import PropTypes from 'prop-types';

import { WbSunny, NightsStay } from '@mui/icons-material';

import { ThemeContext } from 'Context';
import styles from './ThemeButton.module.scss';

const ThemeButton = ({ themeToggler }) => {
  const theme = useContext(ThemeContext);
  const classNameApp = theme === 'light' ? styles.lightTheme : styles.darkTheme;

  return (
    <button className={styles.ThemeButton} onClick={themeToggler}>
      <WbSunny className={classNameApp} />
      <NightsStay className={classNameApp} />
    </button>
  );
};

ThemeButton.propTypes = {
  themeToggler: PropTypes.func.isRequired,
};

export default ThemeButton;
