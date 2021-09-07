import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';

import { Checkbox, TextField, Button } from '@material-ui/core';
import { SaveAltRounded } from '@material-ui/icons';

import { updateTodo } from 'redux/todos/todos-operations';

import styles from './ModalFormCreateUpdateTodo.module.scss';

const ModalFormCreateUpdateTodo = ({ todo, onCloseModal }) => {
  const { _id: id, description, isDone } = todo;
  const { handleSubmit, register, setValue, getValues } = useForm();
  const [updatedIsDone, setUpdatedsDone] = useState(isDone);

  const dispatch = useDispatch();

  const handleCompleted = () => setUpdatedsDone(!updatedIsDone);
  const handleSubmitForm = () => {
    const values = getValues();

    if (values.description === description && isDone === updatedIsDone) {
      onCloseModal();
      return;
    }

    const updatedTodo = {
      description: values.description,
      isDone: updatedIsDone,
    };

    dispatch(updateTodo(id, updatedTodo));
    onCloseModal();
  };

  return (
    <form className={styles.todoForm} onSubmit={handleSubmit(handleSubmitForm)}>
      <Checkbox
        color="primary"
        checked={updatedIsDone}
        onChange={handleCompleted}
      />

      <RHFInput
        as={<TextField type="text" label="Todo" variant="outlined" />}
        name="description"
        defaultValue={description}
        register={register}
        rules={{ required: true }}
        setValue={setValue}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        endIcon={<SaveAltRounded>Save</SaveAltRounded>}
      >
        Save
      </Button>
    </form>
  );
};

ModalFormCreateUpdateTodo.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
  }).isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default ModalFormCreateUpdateTodo;
