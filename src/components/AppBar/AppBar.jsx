import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import AuthNav from 'components/AuthNav';
import UserMenu from 'components/UserMenu';

import { getIsAuthorized } from 'redux/auth/auth-selectors';
import routes from 'routes';
import styles from './AppBar.module.scss';

const AppBar = () => {
  const isAuthorized = useSelector(getIsAuthorized);

  return (
    <div className={styles.AppBar}>
      {isAuthorized && (
        <>
          <NavLink
            to={routes.slider}
            className={styles.NavLink}
            activeClassName={styles.NavLinkActive}
          >
            Slider
          </NavLink>
          <NavLink
            to={routes.todos}
            className={styles.NavLink}
            activeClassName={styles.NavLinkActive}
          >
            Todos
          </NavLink>
        </>
      )}
      {isAuthorized ? <UserMenu /> : <AuthNav />}
    </div>
  );
};

export default AppBar;
