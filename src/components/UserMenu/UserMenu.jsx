import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ExitToAppIcon } from 'icons/ExitToAppIcon';

import UIIconBtn from 'components/UI/UIIconBtn';
import { logout } from 'redux/auth/auth-operations';
import { getUserName, getUserAvatar } from 'redux/auth/auth-selectors';
import { translate } from 'i18n';

import AvatarTemplate from 'images/avatar_template.png';
import routes from 'routes';
import styles from './UserMenu.module.scss';

const UserMenu = () => {
  const name = useSelector(getUserName);
  const avatar = useSelector(getUserAvatar);

  const dispatch = useDispatch();
  const logoutHandler = () => dispatch(logout());

  return (
    <div className={styles.userMenu}>
      <NavLink
        to={routes.profile}
        className={styles.NavLink}
        activeClassName={styles.NavLinkActive}
      >
        <div className={styles.infoWrapper}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.avatar}
              src={avatar || AvatarTemplate}
              alt="User avatar"
            />
          </div>
          <div>
            <p>
              {name
                ? name.charAt(0).toUpperCase() + name.slice(1)
                : translate('guest')}
              !
            </p>
            <p>{translate('my_profile')}!</p>
          </div>
        </div>
      </NavLink>

      <UIIconBtn
        icon={ExitToAppIcon}
        label="Exit"
        title="exit"
        type="button"
        onClick={logoutHandler}
        classNameForm="square"
      />
    </div>
  );
};

export default UserMenu;
