import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import { TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { addTodo } from 'redux/todos/todos-operations';

import styles from './AddTodoForm.module.scss';

const AddTodoForm = () => {
  const { handleSubmit, register, setValue, getValues, reset } = useForm();
  const dispatch = useDispatch();

  const handleSubmitForm = async () => {
    const todo = getValues();
    // console.log(todo);
    dispatch(addTodo(todo));
    reset({ description: '' });
  };

  return (
    <form
      className={styles.addTodoForm}
      onSubmit={handleSubmit(handleSubmitForm)}
      autoComplete="off"
    >
      <RHFInput
        as={<TextField type="text" label="Todo" variant="outlined" />}
        name="description"
        register={register}
        rules={{ required: true }}
        setValue={setValue}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        endIcon={<AddIcon>add</AddIcon>}
      >
        Add todo
      </Button>
    </form>
  );
};

export default AddTodoForm;
