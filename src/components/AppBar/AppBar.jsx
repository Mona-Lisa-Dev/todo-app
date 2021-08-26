import { useSelector } from 'react-redux';

import AuthNav from 'components/AuthNav';
import UserMenu from 'components/UserMenu';

import { getIsAuthorized } from 'redux/auth/auth-selectors';

import styles from './AppBar.module.scss';

const AppBar = () => {
  const isAuthorized = useSelector(getIsAuthorized);

  return (
    <div className={styles.AppBar}>
      {isAuthorized ? <UserMenu /> : <AuthNav />}
    </div>
  );
};

export default AppBar;
