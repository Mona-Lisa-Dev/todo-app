import Pagination from '@material-ui/lab/Pagination';

import styles from './PaginationTodos.module.scss';

const PaginationTodos = ({ page, countPages, onClickPage }) => {
  return (
    <Pagination
      className={styles.pagination}
      count={countPages}
      page={page}
      onChange={onClickPage}
      color="primary"
    />
  );
};

export default PaginationTodos;
