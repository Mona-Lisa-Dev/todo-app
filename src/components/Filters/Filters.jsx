import Search from 'components/Search';
import DatePicker from 'components/DatePicker';

import styles from './Filters.module.scss';

const Filters = ({ limit, byStatus, sort }) => {
  return (
    <div className={styles.Filters}>
      <DatePicker limit={limit} byStatus={byStatus} sort={sort} />
      <Search limit={limit} byStatus={byStatus} sort={sort} />
    </div>
  );
};
export default Filters;
