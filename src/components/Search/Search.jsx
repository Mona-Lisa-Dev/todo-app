import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import _debouce from 'lodash/debounce';
import queryString from 'query-string';

import { TextField } from '@mui/material';

import { Clear } from 'icons/Clear';
import UIIconBtn from 'components/UI/UIIconBtn';

import { getTodos } from 'redux/todos/todos-operations';
import { setFilterValue } from 'redux/todos/todos-actions';
import { getFilterValue, getDateValue } from 'redux/todos/todos-selectors';
import { translate } from 'i18n';

import styles from './Search.module.scss';

const Search = ({ limit, byStatus, sort }) => {
  const filterValue = useSelector(getFilterValue);
  const dateValue = useSelector(getDateValue);

  const history = useHistory();
  const location = useLocation();

  const [value, setValue] = useState(
    queryString.parse(location.search).query || filterValue,
  );
  const dispatch = useDispatch();

  const fn = (searchValue, condition) => {
    if (sort === '' && !byStatus) {
      dispatch(
        getTodos(
          limit,
          0,
          '',
          '',
          searchValue,
          queryString.parse(location.search).date || dateValue,
        ),
      );
    }

    history.push({
      ...location,
      pathname: location.pathname,
      search: searchValue ? condition : '',
    });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilter = useCallback(_debouce(fn, 500), []);

  const onChangeFilter = e => {
    const searchValue = e.currentTarget.value;
    setValue(searchValue);

    dispatch(setFilterValue(searchValue));

    const condition = dateValue
      ? `?date=${dateValue}&query=${searchValue}`
      : `?query=${searchValue}`;

    const normalizedFilter = searchValue.toLowerCase();
    debouncedFilter(normalizedFilter, condition);
  };

  const reset = async () => {
    if (sort === '' && !byStatus) {
      dispatch(getTodos(limit, 0, '', '', '', dateValue));
    }
    setValue('');
    dispatch(setFilterValue(''));

    history.push({
      ...location,
      pathname: location.pathname,
      search: dateValue ? `?date=${dateValue}` : '',
    });
  };

  return (
    <div className={styles.Search}>
      <UIIconBtn
        icon={Clear}
        label="Clear search"
        title="clear_search"
        type="button"
        onClick={reset}
        disabled={filterValue ? false : true}
        classNameForm="round"
      />

      <TextField
        type="text"
        label={translate('search')}
        variant="outlined"
        value={value}
        onChange={onChangeFilter}
      />
    </div>
  );
};

export default Search;
