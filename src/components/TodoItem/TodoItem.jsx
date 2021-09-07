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

import { deleteTodo, updateTodo } from 'redux/todos/todos-operations';

const TodoItem = ({ todo }) => {
  const { _id: id, description, isDone } = todo;
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleToggleModal = () => setShowModal(!showModal);
  const handleCompleted = () => dispatch(updateTodo(id, { isDone: !isDone }));
  const handleDeleteTask = () => dispatch(deleteTodo(id));

  return (
    <>
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <ModalFormCreateUpdateTodo
            todo={todo}
            onCloseModal={handleToggleModal}
          />
        </Modal>
      )}

      <ListItem divider>
        <Checkbox color="primary" checked={isDone} onChange={handleCompleted} />
        <ListItemText onClick={handleToggleModal}>{description}</ListItemText>

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
          onClick={handleDeleteTask}
          title="Delete task"
        >
          <DeleteForever />
        </IconButton>
      </ListItem>
    </>
  );
};

export default TodoItem;
