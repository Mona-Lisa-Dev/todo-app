import Search from 'components/Search';
import DatePicker from 'components/DatePicker';

import styles from './Filters.module.scss';

const Filters = ({ allItems }) => {
  return (
    <div className={styles.Filters}>
      <DatePicker allItems={allItems} />
      <Search />
    </div>
  );
};
export default Filters;
