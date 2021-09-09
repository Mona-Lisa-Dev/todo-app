import { List, ListItem, ListItemText } from '@material-ui/core';
import TodoItem from 'components/TodoItem';

import styles from './TodoList.module.scss';

const TodoList = ({ todosToShow }) => {
  return (
    <>
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
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </List>
    </>
  );
};

export default TodoList;
