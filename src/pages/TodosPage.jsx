import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddTodoForm from 'components/AddTodoForm';
import TodoList from 'components/TodoList';
import PaginationTodos from 'components/PaginationTodos';

import { getTodos, getTodosByOnePage } from 'redux/todos/todos-selectors';
import { getAllTodos, getTodosByPage } from 'redux/todos/todos-operations';

const TodosPage = () => {
  const ITEMS_ON_PAGE = 5;

  const todos = useSelector(getTodos);
  const todosToShow = useSelector(getTodosByOnePage);
  const dispatch = useDispatch();

  const countPages = Math.ceil(todos.length / ITEMS_ON_PAGE);
  const renderPagination = todos.length > ITEMS_ON_PAGE;
  const renderTodoList = todos.length > 0;

  useEffect(
    () => !renderPagination && dispatch(getTodosByPage(ITEMS_ON_PAGE, 0)),
    [ITEMS_ON_PAGE, dispatch, renderPagination, todos],
  );

  useEffect(() => {
    dispatch(getAllTodos());
    dispatch(getTodosByPage(ITEMS_ON_PAGE, 0));
  }, [dispatch]);

  return (
    <>
      <AddTodoForm />
      {renderTodoList && <TodoList todosToShow={todosToShow} />}
      {renderPagination && (
        <PaginationTodos
          todos={todos}
          itemsOnPage={ITEMS_ON_PAGE}
          countPages={countPages}
        />
      )}
    </>
  );
};

export default TodosPage;
