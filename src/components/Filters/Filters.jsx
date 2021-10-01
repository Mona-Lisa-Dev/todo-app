import Search from 'components/Search';
import DatePicker from 'components/DatePicker';

import styles from './Filters.module.scss';

const Filters = ({ limit, offset, byStatus, status, sort }) => {
  return (
    <div className={styles.Filters}>
      <DatePicker
        limit={limit}
        offset={offset}
        byStatus={byStatus}
        status={status}
        sort={sort}
      />
      <Search
        limit={limit}
        offset={offset}
        byStatus={byStatus}
        status={status}
        sort={sort}
      />
    </div>
  );
};
export default Filters;
