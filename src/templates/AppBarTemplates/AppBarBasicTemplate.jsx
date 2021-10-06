import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ThemeButton from 'components/ThemeButton';
import AuthNav from 'components/AuthNav';
import UserMenu from 'components/UserMenu';
import Navigation from 'components/Navigation';
import LanguageSwitcher from 'components/LanguageSwitcher';

import { getIsAuthorized } from 'redux/auth/auth-selectors';
import styles from './AppBar.module.scss';

export const AppBarBasicTemplate = ({ themeToggler, locale, onChange }) => {
  const isAuthorized = useSelector(getIsAuthorized);

  return (
    <div className={styles.AppBar}>
      <div className={styles.appBarWrapper}>
        <div className={styles.switcherWrapper}>
          <LanguageSwitcher locale={locale} onChange={onChange} />
          <ThemeButton themeToggler={themeToggler} />
        </div>
        <div className={styles.menuWrapper}>
          {isAuthorized ? <Navigation /> : <AuthNav />}
          {isAuthorized && <UserMenu />}
        </div>
      </div>
    </div>
  );
};

AppBarBasicTemplate.propTypes = {
  themeToggler: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
