import { useSelector } from 'react-redux';
import { List } from '@material-ui/core';

import TodoItem from 'components/TodoItem';
import { getAllTodos } from 'redux/todos/todos-selectors';

const TodoList = () => {
  const todos = useSelector(getAllTodos);
  console.log(todos);

  return (
    <List>
      {todos?.map(todo => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </List>
  );
};

export default TodoList;
