import { NavLink } from 'react-router-dom';
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
        Slider
      </NavLink>
      <NavLink
        to={routes.todos}
        className={styles.NavLink}
        activeClassName={styles.NavLinkActive}
      >
        Todos
      </NavLink>
    </nav>
  );
};

export default Navigation;
