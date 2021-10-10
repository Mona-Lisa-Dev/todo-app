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

import styles from './AppBar.module.scss';

export const AppBarAdminTemplate = ({
  adminToggler,
  adminPanel,
  themeToggler,
  locale,
  onChange,
}) => {
  const isAuthorized = useSelector(getIsAuthorized);

  return (
    <div className={styles.AppBar}>
      <div className={styles.appBarWrapper}>
        <div className={styles.switcherWrapper}>
          <AdminSwitcher adminToggler={adminToggler} adminPanel={adminPanel} />
          <LanguageSwitcher locale={locale} onChange={onChange} />
          <ThemeButton themeToggler={themeToggler} />
        </div>
        <div className={styles.menuWrapper}>
          {isAuthorized &&
            (adminPanel === 'admin' ? <AdminPanel /> : <Navigation />)}
          {isAuthorized ? <UserMenu /> : <AuthNav />}
        </div>
      </div>
    </div>
  );
};

AppBarAdminTemplate.propTypes = {
  adminToggler: PropTypes.func.isRequired,
  adminPanel: PropTypes.string.isRequired,
  themeToggler: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
