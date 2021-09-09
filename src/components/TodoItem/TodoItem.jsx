import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from '@material-ui/core';
import { Edit, DeleteForever } from '@material-ui/icons';

import Modal from 'components/Modal';
import ModalFormCreateUpdateTodo from 'components/ModalFormCreateUpdateTodo';
import Confirmation from 'components/Confirmation';

import { deleteTodo, updateTodo } from 'redux/todos/todos-operations';

import styles from './TodoItem.module.scss';

const TodoItem = ({ todo }) => {
  const { _id: id, description, isDone } = todo;
  const [showModal, setShowModal] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const dispatch = useDispatch();

  const handleToggleModal = () => setShowModal(!showModal);
  const handleToggleConfirmation = () => setOpenConfirmation(!openConfirmation);
  const handleCompleted = () => dispatch(updateTodo(id, { isDone: !isDone }));
  const handleDeleteTask = () => dispatch(deleteTodo(id));

  return (
    <>
      {openConfirmation && (
        <Confirmation
          open={openConfirmation}
          onClose={handleToggleConfirmation}
          onDelete={handleDeleteTask}
        />
      )}
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <ModalFormCreateUpdateTodo
            todo={todo}
            onCloseModal={handleToggleModal}
            type="update"
          />
        </Modal>
      )}

      <ListItem className={styles.todoItem} divider>
        <div className={styles.first}>
          <Checkbox
            color="primary"
            checked={isDone}
            onChange={handleCompleted}
          />
        </div>
        <ListItemText className={styles.todoText} onClick={handleToggleModal}>
          {description}
        </ListItemText>
        <div className={styles.last}>
          <IconButton
            aria-label="Update task"
            type="button"
            onClick={handleToggleModal}
            title="Update task"
          >
            <Edit />
          </IconButton>

          <IconButton
            aria-label="Delete"
            type="button"
            onClick={handleToggleConfirmation}
            title="Delete task"
          >
            <DeleteForever />
          </IconButton>
        </div>
      </ListItem>
    </>
  );
};

export default TodoItem;
