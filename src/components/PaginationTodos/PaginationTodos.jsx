import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';

import { getTodosByPage, getTodosByStatus } from 'redux/todos/todos-operations';

const PaginationTodos = ({
  sort,
  status,
  completed,
  todos,
  itemsOnPage,
  countPages,
}) => {
  const [page, setPage] = useState(1);
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let skip;

    if (todos % itemsOnPage === 0 && todos / itemsOnPage < page && !change) {
      skip = itemsOnPage * (page - 2);
      setPage(page - 1);
    } else if (
      todos % itemsOnPage === 1 &&
      Math.ceil(todos / itemsOnPage) === page + 1 &&
      !change
    ) {
      skip = itemsOnPage * page;
      setPage(page + 1);
    } else {
      skip = itemsOnPage * (page - 1);
    }

    if (status) {
      if (!change) {
        setPage(1);
        skip = 0;
      }
    }

    status
      ? change && dispatch(getTodosByStatus(itemsOnPage, skip, completed, sort))
      : dispatch(getTodosByPage(itemsOnPage, skip, sort));
    setChange(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, itemsOnPage, page, todos]);

  const handleChange = (_, value) => {
    setChange(true);
    setPage(value);
  };

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
