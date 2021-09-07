import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddTodoForm from 'components/AddTodoForm';
import TodoList from 'components/TodoList';
import PaginationTodos from 'components/PaginationTodos';
import Search from 'components/Search';
import Loader from 'components/Loader';
import DatePicker from 'components/DatePicker';
import SortButtonsPanel from 'components/SortButtonsPanel';

import {
  getTodosByOnePage,
  getTotalTodos,
  getAllItems,
  getCompleteItems,
  getNotCompleteItems,
  getFilter,
  getLoadingTodos,
} from 'redux/todos/todos-selectors';
import {
  getTodosByPage,
  getTodosByStatus,
  getAllTodos,
} from 'redux/todos/todos-operations';

const TodosPage = () => {
  const [byStatus, setByStatus] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [sort, setSort] = useState('');
  const ITEMS_ON_PAGE = 4;

  const todosLength = useSelector(getTotalTodos);
  const todosToShow = useSelector(getTodosByOnePage);

  const allItems = useSelector(getAllItems);
  const completeItems = useSelector(getCompleteItems);
  const notCompleteItems = useSelector(getNotCompleteItems);
  const filteredItems = useSelector(getFilter);
  const isLoading = useSelector(getLoadingTodos);

  const dispatch = useDispatch();

  const countPages = Math.ceil(todosLength / ITEMS_ON_PAGE);
  // const renderPagination = todosLength > ITEMS_ON_PAGE;
  const renderTodoList = todosLength > 0;

  const [renderPagination, setRenderPagination] = useState(false);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [clickPage, setClickPage] = useState(false);

  useEffect(() => {
    todosLength > ITEMS_ON_PAGE
      ? setRenderPagination(true)
      : setRenderPagination(false);
  }, [todosLength]);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch, renderPagination]);

  useEffect(() => {
    if (page) {
      const ifDeleteLastItemOnPage =
        todosLength % ITEMS_ON_PAGE === 0 &&
        todosLength / ITEMS_ON_PAGE < page &&
        page !== 1 &&
        !clickPage;

      const ifAddFirstItemOnPage =
        todosLength % ITEMS_ON_PAGE === 1 &&
        Math.ceil(todosLength / ITEMS_ON_PAGE) === page + 1 &&
        !clickPage;

      if (ifDeleteLastItemOnPage) {
        // setSkip(ITEMS_ON_PAGE * (page - 2));
        // setPage(page - 1);
        setSkip(0);
        setPage(1);
      } else if (ifAddFirstItemOnPage) {
        setSkip(ITEMS_ON_PAGE * page);
        setPage(page + 1);
      } else {
        setSkip(ITEMS_ON_PAGE * (page - 1));
      }

      byStatus
        ? dispatch(getTodosByStatus(ITEMS_ON_PAGE, skip, completed, sort))
        : dispatch(getTodosByPage(ITEMS_ON_PAGE, skip, sort));

      setClickPage(false);
      return;
    } else {
      byStatus
        ? dispatch(getTodosByStatus(ITEMS_ON_PAGE, 0, completed, sort))
        : dispatch(getTodosByPage(ITEMS_ON_PAGE, 0, sort));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, ITEMS_ON_PAGE, page, todosLength, renderPagination]);

  const handleClickOnPage = (_, value) => {
    setSkip(ITEMS_ON_PAGE * (value - 1));
    setClickPage(true);
    setPage(value);
  };

  const handleClickSort = typeOfSort => {
    setPage(1);
    setSkip(0);

    byStatus
      ? dispatch(getTodosByStatus(ITEMS_ON_PAGE, 0, completed, typeOfSort))
      : dispatch(getTodosByPage(ITEMS_ON_PAGE, 0, typeOfSort));
    setSort(typeOfSort);
  };

  const handleChooseCompleted = statusCompleted => {
    setCompleted(statusCompleted);
    setByStatus(true);
    setPage(1);
    setSkip(0);
    dispatch(getTodosByStatus(ITEMS_ON_PAGE, 0, statusCompleted, sort));
  };

  const handleClickAllTodos = () => {
    setByStatus(false);
    setPage(1);
    setSkip(0);
    dispatch(getTodosByPage(ITEMS_ON_PAGE, 0, sort));
  };

  const groupOfItemsForButtons = {
    allItems,
    completeItems,
    notCompleteItems,
  };

  const groupOfFunctionsForButtons = {
    handleClickSort,
    handleChooseCompleted,
    handleClickAllTodos,
  };

  return (
    <>
      {isLoading && <Loader />}
      {filteredItems.length === 0 && <AddTodoForm />}

      {!!allItems.length && (
        <>
          <Search />
          <DatePicker allItems={allItems} />
          {filteredItems.length === 0 && (
            <SortButtonsPanel
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

      {/* {renderPagination && filteredItems.length === 0 && (
        <PaginationTodos
          sort={sort}
          status={byStatus}
          completed={completed}
          todos={todosLength}
          itemsOnPage={ITEMS_ON_PAGE}
          countPages={countPages}
        />
      )} */}
    </>
  );
};

export default TodosPage;
