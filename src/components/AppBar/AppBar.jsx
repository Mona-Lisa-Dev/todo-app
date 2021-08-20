import AuthNav from 'components/AuthNav';

import styles from './AppBar.module.scss';

const AppBar = () => {
  return (
    <div className={styles.AppBar}>
      <AuthNav />
    </div>
  );
};

export default AppBar;
