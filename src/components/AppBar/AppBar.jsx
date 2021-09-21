import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ThemeButton from 'components/ThemeButton';
import AuthNav from 'components/AuthNav';
import UserMenu from 'components/UserMenu';
import Navigation from 'components/Navigation';
import LanguageSwitcher from 'components/LanguageSwitcher';

import { getIsAuthorized } from 'redux/auth/auth-selectors';
import styles from './AppBar.module.scss';

const AppBar = ({ themeToggler, locale, onChange }) => {
  const isAuthorized = useSelector(getIsAuthorized);

  return (
    <div className={styles.AppBar}>
      <div className={styles.switcherWrapper}>
        <LanguageSwitcher locale={locale} onChange={onChange} />
        <ThemeButton themeToggler={themeToggler} />
      </div>

      <div className={styles.appBarWrapper}>
        {isAuthorized && <Navigation />}
        {isAuthorized ? <UserMenu /> : <AuthNav />}
      </div>
    </div>
  );
};

AppBar.propTypes = {
  themeToggler: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AppBar;
