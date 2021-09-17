import { useSelector } from 'react-redux';

import ThemeButton from 'components/ThemeButton';
import AuthNav from 'components/AuthNav';
import UserMenu from 'components/UserMenu';
import Navigation from 'components/Navigation';

import { getIsAuthorized } from 'redux/auth/auth-selectors';
import styles from './AppBar.module.scss';

const AppBar = ({ themeToggler }) => {
  const isAuthorized = useSelector(getIsAuthorized);

  const classNameWrapper = isAuthorized
    ? styles.appBarWrapperAuth
    : styles.appBarWrapper;

  const classAuthNavWrapper = isAuthorized
    ? styles.authNavWrapperAuth
    : styles.authNavWrapper;

  return (
    <div className={styles.AppBar}>
      <div className={classNameWrapper}>
        {isAuthorized && <Navigation />}
        <div className={classAuthNavWrapper}>
          {isAuthorized ? <UserMenu /> : <AuthNav />}
          <ThemeButton themeToggler={themeToggler} />
        </div>
      </div>
    </div>
  );
};

export default AppBar;
