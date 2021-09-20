import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';

import {
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  IconButton,
  FormHelperText,
  useMediaQuery,
} from '@material-ui/core';
import { SaveAltRounded } from '@material-ui/icons';

import { addTodo, updateTodo } from 'redux/todos/todos-operations';
import { translate } from 'i18n';

import styles from './ModalFormCreateUpdateTodo.module.scss';

const ModalFormCreateUpdateTodo = ({
  action = null,
  todo = {},
  onCloseModal,
  type,
}) => {
  const { _id: id, description, isDone } = todo;
  const { handleSubmit, register, setValue, getValues, trigger, errors } =
    useForm();
  const [updatedIsDone, setUpdatedsDone] = useState(isDone || false);

  const dispatch = useDispatch();

  const handleCompleted = () => setUpdatedsDone(!updatedIsDone);
  const handleSubmitForm = async () => {
    const values = getValues();

    if (values.description === description && isDone === updatedIsDone) {
      onCloseModal();
      return;
    }

    const todo = {
      description: values.description,
      isDone: updatedIsDone,
    };

    if (type === 'update') {
      dispatch(updateTodo(id, todo));
    }

    if (type === 'add') {
      await dispatch(addTodo(todo));
      action(true);
    }

    onCloseModal();
  };

  const handleMaxWidth = width => {
    return `(max-width:${width}px) `;
  };
  const mobile = useMediaQuery(handleMaxWidth(600));

  const label_todo = translate('label_todo');
  const todo_required = translate('todo_required');
  const todo_short_msg = translate('todo_short_msg');
  const todo_long_msg = translate('todo_long_msg');

  return (
    <form className={styles.todoForm} onSubmit={handleSubmit(handleSubmitForm)}>
      {mobile ? (
        <Checkbox
          color="primary"
          checked={updatedIsDone}
          onChange={handleCompleted}
        />
      ) : (
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={updatedIsDone}
              onChange={handleCompleted}
            />
          }
          // label={updatedIsDone ? 'Done' : 'Not done'}
          label={updatedIsDone ? translate('done') : translate('not_done')}
        />
      )}

      <div className={styles.inputWrapper}>
        <RHFInput
          as={
            <TextField
              type="text"
              // label="Todo"
              label={label_todo}
              variant="outlined"
            />
          }
          autoFocus
          name="description"
          defaultValue={description}
          register={register}
          rules={{
            // required: 'Description of task is required',
            required: todo_required,
            minLength: {
              value: 3,
              // message: 'Description must be at least 3 characters',
              message: todo_short_msg,
            },
            maxLength: {
              value: 70,
              // message: 'Description must be at most 70 characters',
              message: todo_long_msg,
            },
          }}
          setValue={setValue}
          onChange={() => trigger('description')}
        />
        {errors.description && (
          <FormHelperText className={styles.helperText}>
            {errors.description?.message}
          </FormHelperText>
        )}
      </div>
      {mobile ? (
        <IconButton
          aria-label="Save todo"
          type="submit"
          color="primary"
          title="Save"
        >
          <SaveAltRounded />
        </IconButton>
      ) : (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<SaveAltRounded>Save</SaveAltRounded>}
        >
          {/* Save */}
          {translate('save')}
        </Button>
      )}
    </form>
  );
};

ModalFormCreateUpdateTodo.propTypes = {
  action: PropTypes.func,
  todo: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
  }),
  onCloseModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default ModalFormCreateUpdateTodo;
