import { List } from '@material-ui/core';
import TodoItem from 'components/TodoItem';

const TodoList = ({ todosToShow }) => {
  return (
    <List>
      {todosToShow?.map(todo => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </List>
  );
};

export default TodoList;
