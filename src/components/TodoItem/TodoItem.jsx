import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ListItem, ListItemText, Checkbox } from '@mui/material';

import { Edit } from 'icons/Edit';
import { DeleteForever } from 'icons/DeleteForever';
import UIIconBtn from 'components/UI/UIIconBtn';

import Modal from 'components/Modal';
import ModalFormCreateUpdateTodo from 'components/ModalFormCreateUpdateTodo';
import Confirmation from 'components/Confirmation';

import { deleteTodo, updateTodo } from 'redux/todos/todos-operations';

import styles from './TodoItem.module.scss';

const TodoItem = ({ todo, action }) => {
  const { _id: id, description, isDone } = todo;
  const [showModal, setShowModal] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const dispatch = useDispatch();

  const handleToggleModal = () => setShowModal(!showModal);
  const handleToggleConfirmation = () => setOpenConfirmation(!openConfirmation);
  const handleCompleted = () => dispatch(updateTodo(id, { isDone: !isDone }));
  const handleDeleteTask = async () => {
    await dispatch(deleteTodo(id));
    action(true);
  };

  return (
    <>
      <Confirmation
        open={openConfirmation}
        onClose={handleToggleConfirmation}
        onDelete={handleDeleteTask}
      />

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
          <UIIconBtn
            icon={Edit}
            label="Update task"
            title="update_task"
            type="button"
            onClick={handleToggleModal}
            classNameForm="round"
          />
          <UIIconBtn
            icon={DeleteForever}
            label="Delete"
            title="delete_task"
            type="button"
            onClick={handleToggleConfirmation}
            classNameForm="round"
          />
        </div>
      </ListItem>
    </>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
  }).isRequired,
  action: PropTypes.func.isRequired,
};

export default TodoItem;
