import { NavLink } from 'react-router-dom';
import { translate } from 'i18n';
import routes from 'routes';
import styles from './AuthNav.module.scss';

const AuthNav = () => (
  <div className={styles.AuthNav}>
    <NavLink
      to={routes.signup}
      className={styles.NavLink}
      activeClassName={styles.NavLinkActive}
    >
      {translate('signup')}
    </NavLink>

    <NavLink
      to={routes.login}
      className={styles.NavLink}
      activeClassName={styles.NavLinkActive}
    >
      {translate('login')}
    </NavLink>
  </div>
);

export default AuthNav;
