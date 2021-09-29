// import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ThemeButton from 'components/ThemeButton';
import AuthNav from 'components/AuthNav';
import UserMenu from 'components/UserMenu';
import Navigation from 'components/Navigation';
import LanguageSwitcher from 'components/LanguageSwitcher';
import AdminPanel from 'components/AdminPanel';
import AdminSwitcher from 'components/AdminSwitcher';

import { getIsAuthorized } from 'redux/auth/auth-selectors';
import { getIsAdmin } from 'redux/admin/admin-selectors';
import styles from './AppBar.module.scss';

const AppBar = ({
  adminToggler,
  adminPanel,
  themeToggler,
  locale,
  onChange,
}) => {
  const isAuthorized = useSelector(getIsAuthorized);
  const isAdmin = useSelector(getIsAdmin);

  return (
    <div className={styles.AppBar}>
      {isAdmin && (
        <AdminSwitcher adminToggler={adminToggler} adminPanel={adminPanel} />
      )}

      <div className={styles.switcherWrapper}>
        <LanguageSwitcher locale={locale} onChange={onChange} />
        <ThemeButton themeToggler={themeToggler} />
      </div>

      <div className={styles.appBarWrapper}>
        {isAuthorized && !isAdmin && <Navigation />}
        {isAuthorized &&
          isAdmin &&
          (adminPanel === 'admin' ? <AdminPanel /> : <Navigation />)}
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
