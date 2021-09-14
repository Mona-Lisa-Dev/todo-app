import { useSelector, useDispatch } from 'react-redux';

import { Button, IconButton, useMediaQuery } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { logout } from 'redux/auth/auth-operations';
import { getUserName } from 'redux/auth/auth-selectors';
import styles from './UserMenu.module.scss';

const UserMenu = () => {
  const name = useSelector(getUserName);
  const dispatch = useDispatch();
  const logoutHandler = () => dispatch(logout());

  const handleMaxWidth = width => {
    return `(max-width:${width}px) `;
  };
  const mobile = useMediaQuery(handleMaxWidth(600));

  return (
    <div className={styles.userMenu}>
      <p>
        {name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Guest'}!
        Welcome!
      </p>

      <div>
        {mobile ? (
          <IconButton
            aria-label="Exit"
            type="button"
            color="primary"
            title="Exit"
            onClick={logoutHandler}
          >
            <ExitToAppIcon />
          </IconButton>
        ) : (
          <Button
            type="button"
            variant="contained"
            color="primary"
            endIcon={<ExitToAppIcon>exit</ExitToAppIcon>}
            onClick={logoutHandler}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
