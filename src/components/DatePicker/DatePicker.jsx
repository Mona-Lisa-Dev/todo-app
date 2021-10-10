import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { useIntl } from 'react-intl';
import queryString from 'query-string';

import { TextField, IconButton, useMediaQuery } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import { getTodos } from 'redux/todos/todos-operations';
import { getFilterValue } from 'redux/todos/todos-selectors';
import { setDateValue } from 'redux/todos/todos-actions';
import { translate } from 'i18n';

import styles from './DatePicker.module.scss';

const DatePicker = ({ limit, byStatus, sort }) => {
  const filterValue = useSelector(getFilterValue);

  const history = useHistory();
  const location = useLocation();

  const [date, setDate] = useState(
    queryString.parse(location.search).date ||
      new Date().toISOString().slice(0, 10),
  );
  const [choosenDate, setChoosenDate] = useState(
    location.search.includes('date'),
  );
  const dispatch = useDispatch();
  const intl = useIntl();

  const classNameDatePicker = choosenDate
    ? styles.DatePicker
    : `${styles.DatePicker} ${styles.datePickerNoActive}`;

  const reset = () => {
    const today = new Date().toISOString().slice(0, 10);
    setDate(today);
    setChoosenDate(false);
    dispatch(setDateValue(''));

    if (sort === '' && !byStatus) {
      dispatch(getTodos(limit, 0, '', '', filterValue, ''));
    }

    history.push({
      ...location,
      pathname: location.pathname,
      search: filterValue ? `?query=${filterValue}` : '',
    });
  };

  const handleChange = e => {
    const { value } = e.target;
    setDate(value);
    setChoosenDate(true);
    dispatch(setDateValue(value));

    if (sort === '' && !byStatus) {
      dispatch(
        getTodos(
          limit,
          0,
          '',
          '',
          queryString.parse(location.search).query || filterValue,
          value,
        ),
      );
    }

    const condition = filterValue
      ? `?query=${filterValue}&date=${value}`
      : `?date=${value}`;

    history.push({
      ...location,
      pathname: location.pathname,
      search: value ? condition : '',
    });
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
          <ArrowBack />
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
