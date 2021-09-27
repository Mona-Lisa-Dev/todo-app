import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import { Button, IconButton, useMediaQuery } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { logout } from 'redux/auth/auth-operations';
import { getUserName } from 'redux/auth/auth-selectors';
import { translate } from 'i18n';
import styles from './UserMenu.module.scss';

const UserMenu = () => {
  const intl = useIntl();
  const name = useSelector(getUserName);
  const dispatch = useDispatch();
  const logoutHandler = () => dispatch(logout());

  const handleMaxWidth = width => {
    return `(max-width:${width}px) `;
  };
  const mobile = useMediaQuery(handleMaxWidth(600));

  return (
    <div className={styles.userMenu}>
      <div>
        <p>
          {name
            ? name.charAt(0).toUpperCase() + name.slice(1)
            : translate('guest')}
          !
        </p>
        <p>{translate('welcome')}!</p>
      </div>

      {mobile ? (
        <IconButton
          aria-label="Exit"
          type="button"
          color="primary"
          title={intl.formatMessage({ id: 'exit' })}
          onClick={logoutHandler}
        >
          <ExitToAppIcon />
        </IconButton>
      ) : (
        <Button
          className={styles.exitBtn}
          type="button"
          variant="contained"
          color="primary"
          endIcon={<ExitToAppIcon>exit</ExitToAppIcon>}
          onClick={logoutHandler}
        >
          {translate('logout')}
        </Button>
      )}
    </div>
  );
};

export default UserMenu;
