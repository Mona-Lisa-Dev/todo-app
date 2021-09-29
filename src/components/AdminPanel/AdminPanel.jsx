import { NavLink } from 'react-router-dom';
// import { translate } from 'i18n';
import routes from 'routes';
import styles from './AdminPanel.module.scss';

const AdminPanel = () => {
  return (
    <div className={styles.AdminPanel}>
      <NavLink
        to={routes.allUsers}
        className={styles.NavLink}
        activeClassName={styles.NavLinkActive}
      >
        Users
      </NavLink>

      <NavLink
        to={routes.allTasks}
        className={styles.NavLink}
        activeClassName={styles.NavLinkActive}
      >
        Tasks
      </NavLink>
    </div>
  );
};

export default AdminPanel;
