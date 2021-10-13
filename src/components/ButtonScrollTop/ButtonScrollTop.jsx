import { ArrowUpward } from 'icons/ArrowUpward';
import UIIconBtn from 'components/UI/UIIconBtn';

import styles from './ButtonScrollTop.module.scss';

const ButtonScrollTop = () => {
  return (
    <div className={styles.buttonScrollTop}>
      <UIIconBtn
        icon={ArrowUpward}
        label="Scroll to top"
        title="scroll_to_top"
        type="button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          })
        }
        classNameForm="outlined"
      />
    </div>
  );
};

export default ButtonScrollTop;
