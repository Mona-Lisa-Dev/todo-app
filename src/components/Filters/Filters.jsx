import Search from 'components/Search';
import DatePicker from 'components/DatePicker';

import styles from './Filters.module.scss';

const Filters = () => {
  return (
    <div className={styles.Filters}>
      <DatePicker />
      <Search />
    </div>
  );
};
export default Filters;
