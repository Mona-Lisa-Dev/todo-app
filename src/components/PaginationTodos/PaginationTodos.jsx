import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';

import { getTodosByPage } from 'redux/todos/todos-operations';

const PaginationTodos = ({ todos, itemsOnPage, countPages }) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    let skip;

    if (todos % itemsOnPage === 0 && todos / itemsOnPage < page) {
      skip = itemsOnPage * (page - 2);
    } else {
      skip = itemsOnPage * (page - 1);
    }

    dispatch(getTodosByPage(itemsOnPage, skip));
  }, [dispatch, itemsOnPage, page, todos]);

  const handleChange = (_, value) => setPage(value);

  return (
    <Pagination
      count={countPages}
      page={page}
      onChange={handleChange}
      color="primary"
    />
  );
};

export default PaginationTodos;
