import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IconButton, ButtonGroup } from '@material-ui/core';
import {
  CheckBox,
  CheckBoxOutlineBlank,
  PlaylistAddCheck,
} from '@material-ui/icons';

import AddTodoForm from 'components/AddTodoForm';
import TodoList from 'components/TodoList';
import PaginationTodos from 'components/PaginationTodos';

import {
  getTodosByOnePage,
  getTotalTodos,
  getAllItems,
  getCompleteItems,
  getNotCompleteItems,
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

  const dispatch = useDispatch();

  const countPages = Math.ceil(todosLength / ITEMS_ON_PAGE);
  const renderPagination = todosLength > ITEMS_ON_PAGE;
  const renderTodoList = todosLength > 0;

  useEffect(() => {
    !renderPagination &&
      (byStatus
        ? dispatch(getTodosByStatus(ITEMS_ON_PAGE, 0, completed))
        : dispatch(getTodosByPage(ITEMS_ON_PAGE, 0)));
  }, [ITEMS_ON_PAGE, dispatch, renderPagination, todosLength]);

  useEffect(() => {
    dispatch(getAllTodos());
    renderPagination &&
      (byStatus
        ? dispatch(getTodosByStatus(ITEMS_ON_PAGE, 0, completed))
        : dispatch(getTodosByPage(ITEMS_ON_PAGE, 0)));
  }, [dispatch, renderPagination]);

  return (
    <>
      <AddTodoForm />

      {!!allItems.length && (
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          <IconButton
            aria-label="All todos"
            type="button"
            title="All todos"
            onClick={() => {
              setByStatus(false);
              dispatch(getTodosByPage(ITEMS_ON_PAGE, 0));
            }}
          >
            <PlaylistAddCheck />
            <span>{allItems.length}</span>
          </IconButton>
          <IconButton
            aria-label="Completed"
            type="button"
            title="Completed todos"
            onClick={() => {
              setCompleted(true);
              setByStatus(true);
              dispatch(getTodosByStatus(ITEMS_ON_PAGE, 0, true));
            }}
          >
            <CheckBox />
            <span>{completeItems.length}</span>
          </IconButton>
          <IconButton
            aria-label="Not completed"
            type="button"
            title="Not completed todos"
            onClick={() => {
              setCompleted(false);
              setByStatus(true);
              dispatch(getTodosByStatus(ITEMS_ON_PAGE, 0, false));
            }}
          >
            <CheckBoxOutlineBlank />
            <span>{notCompleteItems.length}</span>
          </IconButton>
        </ButtonGroup>
      )}

      {renderTodoList && <TodoList todosToShow={todosToShow} />}
      {renderPagination && (
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
