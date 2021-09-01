import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth/auth-operations';

import { Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const UserMenu = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => dispatch(logout());

  return (
    <Button
      type="button"
      variant="contained"
      color="primary"
      endIcon={<ExitToAppIcon>add</ExitToAppIcon>}
      onClick={logoutHandler}
    >
      Logout
    </Button>
  );
};

export default UserMenu;
