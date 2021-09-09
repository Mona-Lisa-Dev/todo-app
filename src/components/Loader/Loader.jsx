import { CircularProgress } from '@material-ui/core';

import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
