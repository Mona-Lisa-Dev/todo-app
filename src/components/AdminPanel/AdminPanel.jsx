import { NavLink } from 'react-router-dom';
// import { translate } from 'i18n';
import routes from 'routes';
import styles from './AdminPanel.module.scss';

const AdminPanel = () => (
  <div className={styles.AdminPanel}>
    <NavLink
      to={routes.admin}
      className={styles.NavLink}
      activeClassName={styles.NavLinkActive}
    >
      Admin
    </NavLink>
  </div>
);

export default AdminPanel;
