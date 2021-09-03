import { LinearProgress } from '@material-ui/core';

import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <LinearProgress />
    </div>
  );
};

export default Loader;
