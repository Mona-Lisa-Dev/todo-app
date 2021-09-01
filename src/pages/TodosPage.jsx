import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddTodoForm from 'components/AddTodoForm';
import TodoList from 'components/TodoList';
import PaginationTodos from 'components/PaginationTodos';

import { getTodosByOnePage, getTotalTodos } from 'redux/todos/todos-selectors';
import { getTodosByPage } from 'redux/todos/todos-operations';

const TodosPage = () => {
  const ITEMS_ON_PAGE = 5;

  const todosLength = useSelector(getTotalTodos);
  const todosToShow = useSelector(getTodosByOnePage);
  const dispatch = useDispatch();

  const countPages = Math.ceil(todosLength / ITEMS_ON_PAGE);
  const renderPagination = todosLength > ITEMS_ON_PAGE;
  const renderTodoList = todosLength > 0;

  useEffect(() => {
    !renderPagination && dispatch(getTodosByPage(ITEMS_ON_PAGE, 0));
  }, [ITEMS_ON_PAGE, dispatch, renderPagination, todosLength]);

  useEffect(() => {
    dispatch(getTodosByPage(ITEMS_ON_PAGE, 0));
  }, [dispatch]);

  return (
    <>
      <AddTodoForm />
      {renderTodoList && <TodoList todosToShow={todosToShow} />}
      {renderPagination && (
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
