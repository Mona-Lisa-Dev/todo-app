import PropTypes from 'prop-types';
import { List, ListItem, ListItemText } from '@material-ui/core';
import TodoItem from 'components/TodoItem';

import styles from './TodoList.module.scss';

const TodoList = ({ todosToShow, deleteTodo }) => {
  return (
    <div className={styles.listContainer}>
      <List className={styles.listNames}>
        <ListItem className={styles.first}>
          <ListItemText>Status</ListItemText>
        </ListItem>
        <ListItem className={styles.middle}>
          <ListItemText>Name</ListItemText>
        </ListItem>
        <ListItem className={styles.last}>
          <ListItemText>Actions</ListItemText>
        </ListItem>
      </List>
      <List>
        {todosToShow?.map(todo => (
          <TodoItem key={todo._id} todo={todo} action={deleteTodo} />
        ))}
      </List>
    </div>
  );
};

TodoList.propTypes = {
  todosToShow: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string.isRequired,
      isDone: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
