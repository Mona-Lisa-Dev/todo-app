import { Button } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';

import styles from './ButtonScrollTop.module.scss';

const ButtonScrollTop = () => {
  return (
    <div className={styles.buttonScrollTop}>
      <Button
        variant="outlined"
        color="primary"
        type="button"
        title="Scroll to top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          })
        }
      >
        <ArrowUpward />
      </Button>
    </div>
  );
};

export default ButtonScrollTop;
