import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AddTodoForm from 'components/AddTodoForm';
import TodoList from 'components/TodoList';

import { getAllTodos } from 'redux/todos/todos-operations';

const TodosPage = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(getAllTodos()), [dispatch]);

  return (
    <>
      <AddTodoForm />
      <TodoList />
    </>
  );
};

export default TodosPage;
