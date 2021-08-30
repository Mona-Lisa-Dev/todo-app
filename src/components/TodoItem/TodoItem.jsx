import { useDispatch } from 'react-redux';
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { deleteTodo, updateTodo } from 'redux/todos/todos-operations';

const TodoItem = ({ todo }) => {
  const { _id: id, description, isDone } = todo;
  const dispatch = useDispatch();

  const handleCompleted = () => dispatch(updateTodo(id, { isDone: !isDone }));
  const handleDeleteTask = () => dispatch(deleteTodo(id));

  return (
    <ListItem divider>
      <Checkbox color="primary" checked={isDone} onChange={handleCompleted} />
      <ListItemText>{description}</ListItemText>

      <IconButton
        aria-label="Delete"
        type="button"
        onClick={handleDeleteTask}
        title="Delete task"
      >
        <DeleteForeverIcon />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;
