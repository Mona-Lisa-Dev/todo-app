import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IconButton } from '@material-ui/core';
import {
  CheckBox,
  CheckBoxOutlineBlank,
  PlaylistAddCheck,
} from '@material-ui/icons';

import AddTodoForm from 'components/AddTodoForm';
import TodoList from 'components/TodoList';
import PaginationTodos from 'components/PaginationTodos';

import { getTodosByOnePage, getTotalTodos } from 'redux/todos/todos-selectors';
import { getTodosByPage, getTodosByStatus } from 'redux/todos/todos-operations';

const TodosPage = () => {
  const [byStatus, setByStatus] = useState(false);
  const ITEMS_ON_PAGE = 5;

  const todosLength = useSelector(getTotalTodos);
  const todosToShow = useSelector(getTodosByOnePage);
  const dispatch = useDispatch();

  const countPages = Math.ceil(todosLength / ITEMS_ON_PAGE);
  const renderPagination = todosLength > ITEMS_ON_PAGE;
  const renderTodoList = todosLength > 0;

  useEffect(() => {
    // !renderPagination &&
    //   !byStatus &&
    //   dispatch(getTodosByPage(ITEMS_ON_PAGE, 0));

    !renderPagination && dispatch(getTodosByPage(ITEMS_ON_PAGE, 0));
  }, [ITEMS_ON_PAGE, dispatch, renderPagination, todosLength]);

  useEffect(() => {
    // renderPagination && !byStatus && dispatch(getTodosByPage(ITEMS_ON_PAGE, 0));
    renderPagination && dispatch(getTodosByPage(ITEMS_ON_PAGE, 0));
  }, [dispatch, renderPagination]);

  return (
    <>
      <AddTodoForm />
      <p>Total todos: {todosLength}</p>
      {/* <IconButton
        aria-label="Completed"
        type="button"
        title="Completed todos"
        onClick={() => {
          setByStatus(true);
          dispatch(getTodosByStatus(true));
        }}
      >
        <CheckBox />
      </IconButton>
      <IconButton
        aria-label="Not completed"
        type="button"
        title="Not completed todos"
        onClick={() => {
          setByStatus(true);
          dispatch(getTodosByStatus(false));
        }}
      >
        <CheckBoxOutlineBlank />
      </IconButton>
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
      </IconButton> */}

      {renderTodoList && <TodoList todosToShow={todosToShow} />}
      {renderPagination && !byStatus && (
        <PaginationTodos
          todos={todosLength}
          itemsOnPage={ITEMS_ON_PAGE}
          countPages={countPages}
        />
      )}
    </>
  );
};

export default TodosPage;
