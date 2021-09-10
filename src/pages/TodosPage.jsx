import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddTodoBtn from 'components/AddTodoBtn';
import TodoList from 'components/TodoList';
import PaginationTodos from 'components/PaginationTodos';
import Loader from 'components/Loader';
import Filters from 'components/Filters';
import SortButtonsPanel from 'components/SortButtonsPanel';
import AlertError from 'components/AlertError';

import {
  getTodosByOnePage,
  getTotalTodos,
  getFilter,
  getLoadingTodos,
  getLengthForPagination,
} from 'redux/todos/todos-selectors';
import { getErrorMessage } from 'redux/error/error-selectors';
import { getTodosByPage, getTodosByStatus } from 'redux/todos/todos-operations';

const TodosPage = () => {
  const [byStatus, setByStatus] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [sort, setSort] = useState('');
  const [renderPagination, setRenderPagination] = useState(false);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [clickPage, setClickPage] = useState(false);
  const ITEMS_ON_PAGE = 4;

  const todosLength = useSelector(getTotalTodos);
  const todosLengthForPagination = useSelector(getLengthForPagination);
  const todosToShow = useSelector(getTodosByOnePage);
  const filteredItems = useSelector(getFilter);
  const isLoading = useSelector(getLoadingTodos);
  const error = useSelector(getErrorMessage);

  const dispatch = useDispatch();

  const countPages = Math.ceil(todosLengthForPagination / ITEMS_ON_PAGE);
  const renderTodoList = todosLength > 0;
  const resetPage = () => {
    setPage(1);
    setSkip(0);
  };

  useEffect(() => {
    countPages > 1 ? setRenderPagination(true) : setRenderPagination(false);
  }, [countPages]);

  useEffect(() => {
    const ifDeleteLastItemOnPage =
      todosLengthForPagination % ITEMS_ON_PAGE === 0 &&
      todosLengthForPagination / ITEMS_ON_PAGE < page &&
      page !== 1 &&
      !clickPage;

    if (ifDeleteLastItemOnPage) {
      setSkip(ITEMS_ON_PAGE * (page - 2));
      setPage(page - 1);
      // resetPage()
    } else {
      setSkip(ITEMS_ON_PAGE * (page - 1));
    }

    byStatus
      ? dispatch(getTodosByStatus(ITEMS_ON_PAGE, skip, completed, sort))
      : dispatch(getTodosByPage(ITEMS_ON_PAGE, skip, sort));

    setClickPage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, todosLengthForPagination, page]);

  const handleClickOnPage = (_, value) => {
    setSkip(ITEMS_ON_PAGE * (value - 1));
    setClickPage(true);
    setPage(value);
  };

  const handleClickSort = typeOfSort => {
    resetPage();

    byStatus
      ? dispatch(getTodosByStatus(ITEMS_ON_PAGE, 0, completed, typeOfSort))
      : dispatch(getTodosByPage(ITEMS_ON_PAGE, 0, typeOfSort));
    setSort(typeOfSort);
  };

  const handleChooseCompleted = statusCompleted => {
    setCompleted(statusCompleted);
    setByStatus(true);
    resetPage();
    dispatch(getTodosByStatus(ITEMS_ON_PAGE, 0, statusCompleted, sort));
  };

  const handleClickAllTodos = () => {
    setByStatus(false);
    resetPage();
    dispatch(getTodosByPage(ITEMS_ON_PAGE, 0, sort));
  };

  const groupOfItemsForButtons = {
    todosLength,
    todosLengthForPagination,
  };

  const groupOfFunctionsForButtons = {
    handleClickSort,
    handleChooseCompleted,
    handleClickAllTodos,
  };

  return (
    <>
      {error && <AlertError error={error} />}
      {isLoading && <Loader />}
      {filteredItems.length === 0 && <AddTodoBtn />}

      {!!todosLength && (
        <>
          <Filters />

          {filteredItems.length === 0 && (
            <SortButtonsPanel
              byStatus={byStatus}
              completed={completed}
              items={groupOfItemsForButtons}
              onClicks={groupOfFunctionsForButtons}
            />
          )}
        </>
      )}

      {renderTodoList &&
        (filteredItems.length === 0 ? (
          <TodoList todosToShow={todosToShow} />
        ) : (
          <TodoList todosToShow={filteredItems} />
        ))}

      {renderPagination && filteredItems.length === 0 && (
        <PaginationTodos
          page={page}
          countPages={countPages}
          onClickPage={handleClickOnPage}
        />
      )}
    </>
  );
};

export default TodosPage;
