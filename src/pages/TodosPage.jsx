import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddTodoBtn from 'components/AddTodoBtn';
import TodoList from 'components/TodoList';
import PaginationTodos from 'components/PaginationTodos';
import Loader from 'components/Loader';
import Filters from 'components/Filters';
import SortButtonsPanel from 'components/SortButtonsPanel';
import AlertError from 'components/AlertError';
import ButtonScrollTop from 'components/ButtonScrollTop';
import Charts from 'components/Charts';
import TodosContentWrapper from 'components/TodosContentWrapper';

import {
  getTodosByOnePage,
  getTotalTodos,
  getFilterValue,
  getDateValue,
  getLoadingTodos,
  getLengthForPagination,
  getCompleteTodos,
  getNotCompleteTodos,
} from 'redux/todos/todos-selectors';
import { getErrorMessage } from 'redux/error/error-selectors';
import { getTodos } from 'redux/todos/todos-operations';

const TodosPage = ({
  chooseStatus = false,
  chooseCompleted = '',
  chooseSort = '',
}) => {
  const [byStatus, setByStatus] = useState(chooseStatus);
  const [completed, setCompleted] = useState(chooseCompleted);
  const [sort, setSort] = useState(chooseSort);

  const [renderPagination, setRenderPagination] = useState(false);
  const [page, setPage] = useState(1);
  const [isCreatedTodo, setIsCreatedTodo] = useState(false);
  const [isDeletedTodo, setIsDeletedTodo] = useState(false);

  const ITEMS_ON_PAGE = 4;
  // const ITEMS_FOR_SCROLL_TOP = 6;

  const todosLength = useSelector(getTotalTodos);
  const todosLengthForPagination = useSelector(getLengthForPagination);
  const todosToShow = useSelector(getTodosByOnePage);
  const isLoading = useSelector(getLoadingTodos);
  const error = useSelector(getErrorMessage);
  const filterValue = useSelector(getFilterValue);
  const dateValue = useSelector(getDateValue);

  const complete = useSelector(getCompleteTodos);
  const notComplete = useSelector(getNotCompleteTodos);

  const dispatch = useDispatch();

  const countPages = Math.ceil(todosLengthForPagination / ITEMS_ON_PAGE);
  const renderTodoList = todosLength > 0;
  const resetPage = () => {
    setPage(1);
  };

  useEffect(() => {
    countPages > 1 ? setRenderPagination(true) : setRenderPagination(false);
  }, [countPages]);

  useEffect(() => {
    dispatch(
      getTodos(
        ITEMS_ON_PAGE,
        0,
        byStatus ? completed : '',
        sort,
        filterValue,
        dateValue,
      ),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    (async function () {
      if (isCreatedTodo) {
        const skipPage = ITEMS_ON_PAGE * (page - 1);

        dispatch(
          getTodos(
            ITEMS_ON_PAGE,
            skipPage,
            byStatus ? completed : '',
            sort,
            filterValue,
            dateValue,
          ),
        );

        setIsCreatedTodo(false);
      }

      if (isDeletedTodo) {
        const ifDeleteLastItemOnPage =
          todosLengthForPagination % ITEMS_ON_PAGE === 0 &&
          todosLengthForPagination / ITEMS_ON_PAGE < page &&
          page !== 1;

        let skipPage;

        if (ifDeleteLastItemOnPage) {
          setPage(page - 1);
          skipPage = ITEMS_ON_PAGE * (page - 2);
        } else {
          skipPage = ITEMS_ON_PAGE * (page - 1);
        }

        dispatch(
          getTodos(
            ITEMS_ON_PAGE,
            skipPage,
            byStatus ? completed : '',
            sort,
            filterValue,
            dateValue,
          ),
        );

        setIsDeletedTodo(false);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isCreatedTodo, isDeletedTodo]);

  const createTodo = isCreated => setIsCreatedTodo(isCreated);
  const deleteTodo = isDeleted => setIsDeletedTodo(isDeleted);

  const handleClickOnPage = async (_, value) => {
    setPage(value);
    const skipPage = ITEMS_ON_PAGE * (value - 1);

    dispatch(
      getTodos(
        ITEMS_ON_PAGE,
        skipPage,
        byStatus ? completed : '',
        sort,
        filterValue,
        dateValue,
      ),
    );
  };

  const handleClickSort = typeOfSort => {
    resetPage();

    dispatch(
      getTodos(
        ITEMS_ON_PAGE,
        0,
        byStatus ? completed : '',
        sort,
        filterValue,
        dateValue,
      ),
    );
    setSort(typeOfSort);
  };

  const handleChooseCompleted = statusCompleted => {
    setCompleted(statusCompleted);
    setByStatus(true);
    resetPage();

    dispatch(
      getTodos(ITEMS_ON_PAGE, 0, statusCompleted, sort, filterValue, dateValue),
    );
  };

  const handleClickAllTodos = () => {
    setByStatus(false);
    resetPage();

    dispatch(
      getTodos(
        ITEMS_ON_PAGE,
        0,
        byStatus ? completed : '',
        sort,
        filterValue,
        dateValue,
      ),
    );
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

      <TodosContentWrapper>
        {!!todosLength && (
          <Charts complete={complete} notComplete={notComplete} />
        )}

        <div style={{ width: '100%' }}>
          <AddTodoBtn createTodo={createTodo} />
          {(!!todosLength || !!todosLengthForPagination) && (
            <>
              <Filters
                limit={ITEMS_ON_PAGE}
                offset={0}
                byStatus={byStatus}
                status={completed}
                sort={sort}
              />

              <SortButtonsPanel
                sortBy={sort}
                byStatus={byStatus}
                completed={completed}
                items={groupOfItemsForButtons}
                onClicks={groupOfFunctionsForButtons}
              />
            </>
          )}
          {(renderTodoList || !!todosLengthForPagination) && (
            <TodoList todosToShow={todosToShow} deleteTodo={deleteTodo} />
          )}
          {renderPagination && !filterValue && !dateValue && (
            <PaginationTodos
              page={page}
              countPages={countPages}
              onClickPage={handleClickOnPage}
            />
          )}
        </div>
      </TodosContentWrapper>
      <ButtonScrollTop />
    </>
  );
};

export default TodosPage;
