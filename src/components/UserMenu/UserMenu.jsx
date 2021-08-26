import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth/auth-operations';

import styles from './UserMenu.module.scss';

const UserMenu = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => dispatch(logout());

  return (
    <button className={styles.logoutButton} onClick={logoutHandler}>
      Logout
    </button>
  );
};

export default UserMenu;
