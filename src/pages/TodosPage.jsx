import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, ButtonGroup } from '@material-ui/core';
import {
  CheckBox,
  CheckBoxOutlineBlank,
  PlaylistAddCheck,
} from '@material-ui/icons';

import AddTodoForm from 'components/AddTodoForm';
import TodoList from 'components/TodoList';
import PaginationTodos from 'components/PaginationTodos';
import Search from 'components/Search';

import {
  getTodosByOnePage,
  getTotalTodos,
  getAllItems,
  getCompleteItems,
  getNotCompleteItems,
  getFilter,
} from 'redux/todos/todos-selectors';
import {
  getTodosByPage,
  getTodosByStatus,
  getAllTodos,
} from 'redux/todos/todos-operations';

const TodosPage = () => {
  const [byStatus, setByStatus] = useState(false);
  const [completed, setCompleted] = useState(false);
  const ITEMS_ON_PAGE = 5;

  const todosLength = useSelector(getTotalTodos);
  const todosToShow = useSelector(getTodosByOnePage);

  const allItems = useSelector(getAllItems);
  const completeItems = useSelector(getCompleteItems);
  const notCompleteItems = useSelector(getNotCompleteItems);
  const filteredItems = useSelector(getFilter);

  const dispatch = useDispatch();

  const countPages = Math.ceil(todosLength / ITEMS_ON_PAGE);
  const renderPagination = todosLength > ITEMS_ON_PAGE;
  const renderTodoList = todosLength > 0;

  useEffect(() => {
    !renderPagination &&
      (byStatus
        ? dispatch(getTodosByStatus(ITEMS_ON_PAGE, 0, completed))
        : dispatch(getTodosByPage(ITEMS_ON_PAGE, 0)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ITEMS_ON_PAGE, dispatch, renderPagination, todosLength]);

  useEffect(() => {
    dispatch(getAllTodos());
    renderPagination &&
      (byStatus
        ? dispatch(getTodosByStatus(ITEMS_ON_PAGE, 0, completed))
        : dispatch(getTodosByPage(ITEMS_ON_PAGE, 0)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, renderPagination]);

  return (
    <>
      <AddTodoForm />

      {!!allItems.length && (
        <>
          <Search />
          {filteredItems.length === 0 && (
            <ButtonGroup
              variant="text"
              color="primary"
              aria-label="text primary button group"
            >
              <Button
                type="button"
                title="All todos"
                onClick={() => {
                  setByStatus(false);
                  dispatch(getTodosByPage(ITEMS_ON_PAGE, 0));
                }}
                startIcon={<PlaylistAddCheck />}
              >
                {allItems.length}
              </Button>
              <Button
                type="button"
                title="Completed todos"
                onClick={() => {
                  setCompleted(true);
                  setByStatus(true);
                  dispatch(getTodosByStatus(ITEMS_ON_PAGE, 0, true));
                }}
                startIcon={<CheckBox />}
              >
                {completeItems.length}
              </Button>
              <Button
                type="button"
                title="Not completed todos"
                onClick={() => {
                  setCompleted(false);
                  setByStatus(true);
                  dispatch(getTodosByStatus(ITEMS_ON_PAGE, 0, false));
                }}
                startIcon={<CheckBoxOutlineBlank />}
              >
                {notCompleteItems.length}
              </Button>
            </ButtonGroup>
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
          status={byStatus}
          completed={completed}
          todos={todosLength}
          itemsOnPage={ITEMS_ON_PAGE}
          countPages={countPages}
        />
      )}
    </>
  );
};

export default TodosPage;
