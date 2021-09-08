import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import AlertError from 'components/AlertError';
import * as todosActions from 'redux/todos/todos-actions';

import styles from './DatePicker.module.scss';

const DatePicker = ({ allItems }) => {
  const [value, setValue] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const reset = () => {
    setValue(new Date().toISOString().slice(0, 10));
    const filteredItems = [];
    dispatch(todosActions.changeFilter(filteredItems));
    setError('');
  };

  const onCloseAlert = () => setError('');

  const handleChange = e => {
    const filteredByDate = allItems.filter(
      ({ createdAt }) =>
        new Date(createdAt).toISOString().slice(0, 10) === e.target.value,
    );

    setValue(e.target.value);

    if (filteredByDate.length === 0) {
      reset();
      setError(
        `No tasks were created ${e.target.value}. Look at the tasks of other days`,
      );
      return;
    }

    if (filteredByDate.length > 0) {
      setError('');
      dispatch(todosActions.changeFilter(filteredByDate));
    }
  };

  return (
    <>
      {error && <AlertError error={error} onClose={onCloseAlert} />}
      <form className={styles.DatePicker} noValidate>
        {/* <IconButton
          aria-label="Show all todos"
          type="reset"
          variant="contained"
          color="primary"
          title="Show all todos"
          onClick={reset}
        >
          <ArrowBackIcon />
        </IconButton> */}

        <TextField
          label="Select todo by creation date"
          type="date"
          value={value}
          onChange={handleChange}
          variant="outlined"
        />
      </form>
    </>
  );
};

export default DatePicker;
