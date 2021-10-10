import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { translate } from 'i18n';
import routes from 'routes';
import styles from './AdminSwitcher.module.scss';

const AdminSwitcher = ({ adminToggler, adminPanel }) => {
  const history = useHistory();

  const classNameAdminSwitcher =
    adminPanel === 'admin' ? styles.adminPanel : styles.userPanel;

  const handleClickSwitcher = async () => {
    await adminToggler();

    adminPanel === 'admin'
      ? history.push(routes.todos)
      : history.push(routes.allUsers);
  };

  return (
    <button className={styles.AdminButton} onClick={handleClickSwitcher}>
      <p className={classNameAdminSwitcher}> {translate('admin')}</p>
      <p className={classNameAdminSwitcher}> {translate('user')}</p>
    </button>
  );
};

AdminSwitcher.propTypes = {
  adminToggler: PropTypes.func.isRequired,
  adminPanel: PropTypes.string.isRequired,
};

export default AdminSwitcher;
