import { useState } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Modal from 'components/Modal';
import ModalFormCreateUpdateTodo from 'components/ModalFormCreateUpdateTodo';

import styles from './AddTodoBtn.module.scss';

const AddTodoBtn = () => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => setShowModal(!showModal);

  return (
    <div className={styles.addTodoBtnWrapper}>
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <ModalFormCreateUpdateTodo
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

export default AddTodoBtn;
