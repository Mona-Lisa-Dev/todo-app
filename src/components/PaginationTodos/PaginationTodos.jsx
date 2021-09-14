import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import { useMediaQuery } from '@material-ui/core';

import styles from './PaginationTodos.module.scss';

const PaginationTodos = ({ page, countPages, onClickPage }) => {
  const handleMaxWidth = width => {
    return `(max-width:${width}px) `;
  };
  const mobile = useMediaQuery(handleMaxWidth(600));

  return (
    <Pagination
      size={mobile ? 'small' : 'medium'}
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
