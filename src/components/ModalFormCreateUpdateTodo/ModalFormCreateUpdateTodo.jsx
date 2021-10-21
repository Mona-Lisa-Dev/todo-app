import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import {
  Checkbox,
  FormControlLabel,
  TextField,
  FormHelperText,
  useMediaQuery,
} from '@mui/material';

import { SaveAltRounded } from 'icons/SaveAltRounded';
import UIIconBtn from 'components/UI/UIIconBtn';
import UIBtn from 'components/UI/UIBtn';
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

  return (
    <form className={styles.todoForm} onSubmit={handleSubmit(handleSubmitForm)}>
      {mobile ? (
        <Checkbox
          className={styles.checkbox}
          color="primary"
          checked={updatedIsDone}
          onChange={handleCompleted}
        />
      ) : (
        <FormControlLabel
          control={
            <Checkbox
              className={styles.checkbox}
              color="primary"
              checked={updatedIsDone}
              onChange={handleCompleted}
            />
          }
          label={updatedIsDone ? translate('done') : translate('not_done')}
        />
      )}

      <div className={styles.inputWrapper}>
        <RHFInput
          as={
            <TextField
              type="text"
              label={translate('label_todo')}
              variant="outlined"
            />
          }
          autoFocus
          name="description"
          defaultValue={description}
          register={register}
          rules={{
            required: translate('todo_required'),
            minLength: {
              value: 3,
              message: translate('todo_short_msg'),
            },
            maxLength: {
              value: 70,
              message: translate('todo_long_msg'),
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
      <div className={styles.btnWrapper}>
        {mobile ? (
          <UIIconBtn
            icon={SaveAltRounded}
            label="Save todo"
            title="save"
            type="submit"
            classNameForm="square"
          />
        ) : (
          <UIBtn
            classNameForm="contained"
            text="save"
            type="submit"
            icon={SaveAltRounded}
          />
        )}
      </div>
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
