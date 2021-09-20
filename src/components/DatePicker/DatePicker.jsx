import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, IconButton, useMediaQuery } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { getTodosByDate } from 'redux/todos/todos-operations';
import { clearFilter } from 'redux/todos/todos-actions';
import { translate } from 'i18n';

import styles from './DatePicker.module.scss';

const DatePicker = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const dispatch = useDispatch();

  const reset = () => {
    const today = new Date().toISOString().slice(0, 10);
    setDate(today);
    dispatch(clearFilter());
  };

  const handleChange = e => {
    const { value } = e.target;
    setDate(value);

    dispatch(getTodosByDate(value));
  };

  const handleMinWidth = width => {
    return `(min-width:${width}px) `;
  };
  const desc = useMediaQuery(handleMinWidth(601));

  return (
    desc && (
      <form className={styles.DatePicker} noValidate>
        <IconButton
          aria-label="Show all todos"
          type="reset"
          color="primary"
          title="Show all todos"
          onClick={reset}
        >
          <ArrowBackIcon />
        </IconButton>

        <TextField
          // label="Select todo by creation date"
          label={translate('date_picker_label')}
          type="date"
          value={date}
          onChange={handleChange}
          variant="outlined"
        />
      </form>
    )
  );
};

export default DatePicker;
