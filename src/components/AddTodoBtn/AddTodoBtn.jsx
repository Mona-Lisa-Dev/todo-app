import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Modal from 'components/Modal';
import ModalFormCreateUpdateTodo from 'components/ModalFormCreateUpdateTodo';

import styles from './AddTodoBtn.module.scss';

const AddTodoBtn = ({ createTodo }) => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => setShowModal(!showModal);

  return (
    <div className={styles.addTodoBtnWrapper}>
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <ModalFormCreateUpdateTodo
            action={createTodo}
            onCloseModal={handleToggleModal}
            type="add"
          />
        </Modal>
      )}
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={handleToggleModal}
        endIcon={<AddIcon>add</AddIcon>}
      >
        Add todo
      </Button>
    </div>
  );
};

AddTodoBtn.propTypes = {
  createTodo: PropTypes.func.isRequired,
};

export default AddTodoBtn;
