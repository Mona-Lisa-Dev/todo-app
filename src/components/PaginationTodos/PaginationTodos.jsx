import PropTypes from 'prop-types';
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

PaginationTodos.propTypes = {
  page: PropTypes.number.isRequired,
  countPages: PropTypes.number.isRequired,
  onClickPage: PropTypes.func.isRequired,
};

export default PaginationTodos;
