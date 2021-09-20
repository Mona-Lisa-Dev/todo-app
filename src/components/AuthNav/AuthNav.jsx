import { NavLink } from 'react-router-dom';

import { translate } from 'i18n';
import routes from 'routes';
import styles from './AuthNav.module.scss';

const AuthNav = () => {
  const signupText = translate('signup');
  const loginText = translate('login');

  return (
    <div className={styles.AuthNav}>
      <NavLink
        to={routes.signup}
        className={styles.NavLink}
        activeClassName={styles.NavLinkActive}
      >
        {/* Sign up */}
        {signupText}
      </NavLink>

      <NavLink
        to={routes.login}
        className={styles.NavLink}
        activeClassName={styles.NavLinkActive}
      >
        {/* Log in */}
        {loginText}
      </NavLink>
    </div>
  );
};

export default AuthNav;
