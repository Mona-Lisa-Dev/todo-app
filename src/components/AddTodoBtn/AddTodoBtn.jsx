import { useState } from 'react';
import PropTypes from 'prop-types';

import { AddIcon } from 'icons/AddIcon';
import UIBtn from 'components/UI/UIBtn';

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

      <UIBtn
        classNameForm="contained"
        text="add"
        type="button"
        onClick={handleToggleModal}
        icon={AddIcon}
      />
    </div>
  );
};

AddTodoBtn.propTypes = {
  createTodo: PropTypes.func.isRequired,
};

export default AddTodoBtn;
