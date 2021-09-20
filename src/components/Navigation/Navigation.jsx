import { NavLink } from 'react-router-dom';

import { translate } from 'i18n';
import routes from 'routes';
import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
    <nav className={styles.navWrapper}>
      <NavLink
        to={routes.slider}
        className={styles.NavLink}
        activeClassName={styles.NavLinkActive}
      >
        {/* Slider */}
        {translate('slider')}
      </NavLink>
      <NavLink
        to={routes.todos}
        className={styles.NavLink}
        activeClassName={styles.NavLinkActive}
      >
        {/* Todos */}
        {translate('todos')}
      </NavLink>
    </nav>
  );
};

export default Navigation;
