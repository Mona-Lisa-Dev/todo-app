import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { TextField, IconButton, useMediaQuery } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { getTodos } from 'redux/todos/todos-operations';
import { getFilterValue, getDateValue } from 'redux/todos/todos-selectors';
import { setDateValue } from 'redux/todos/todos-actions';
import { translate } from 'i18n';

import styles from './DatePicker.module.scss';

const DatePicker = ({ limit, offset, byStatus, status, sort }) => {
  const dateValue = useSelector(getDateValue);
  const [date, setDate] = useState(
    dateValue || new Date().toISOString().slice(0, 10),
  );
  const [choosenDate, setChoosenDate] = useState(false);
  const dispatch = useDispatch();
  const intl = useIntl();
  const filterValue = useSelector(getFilterValue);

  const classNameDatePicker = choosenDate
    ? styles.DatePicker
    : `${styles.DatePicker} ${styles.datePickerNoActive}`;

  const reset = () => {
    const today = new Date().toISOString().slice(0, 10);
    setDate(today);
    setChoosenDate(false);
    dispatch(setDateValue(''));
    dispatch(
      getTodos(limit, offset, byStatus ? status : '', sort, filterValue, ''),
    );
  };

  const handleChange = e => {
    const { value } = e.target;
    setDate(value);
    setChoosenDate(true);
    dispatch(setDateValue(value));

    dispatch(
      getTodos(limit, offset, byStatus ? status : '', sort, filterValue, value),
    );
  };

  const handleMinWidth = width => {
    return `(min-width:${width}px) `;
  };
  const desc = useMediaQuery(handleMinWidth(601));

  return (
    desc && (
      <form className={classNameDatePicker} noValidate>
        <IconButton
          aria-label="Show all todos"
          type="reset"
          color="primary"
          title={intl.formatMessage({ id: 'show_all_todos' })}
          onClick={reset}
          disabled={choosenDate ? false : true}
        >
          <ArrowBackIcon />
        </IconButton>

        <TextField
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
