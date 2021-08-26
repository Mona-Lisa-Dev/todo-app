import { useDispatch } from 'react-redux';
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { deleteTodo } from 'redux/todos/todos-operations';

const TodoItem = ({ todo }) => {
  const { _id: id, description } = todo;
  const dispatch = useDispatch();

  const onDeleteTask = () => dispatch(deleteTodo(id));

  return (
    <ListItem divider>
      <Checkbox color="primary" />
      <ListItemText>{description}</ListItemText>

      <IconButton
        aria-label="Delete"
        type="button"
        onClick={onDeleteTask}
        title="Delete task"
      >
        <DeleteForeverIcon />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;
