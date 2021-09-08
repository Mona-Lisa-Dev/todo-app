import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import _debouce from 'lodash/debounce';

import { TextField } from '@material-ui/core';
import { getTodosByQuery } from 'redux/todos/todos-operations';

import styles from './Search.module.scss';

const Search = () => {
  const [value, setValue] = useState('');

  const dispatch = useDispatch();

  const fn = searchValue => dispatch(getTodosByQuery(searchValue));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilter = useCallback(_debouce(fn, 500), []);

  const onChangeFilter = e => {
    const searchValue = e.currentTarget.value;
    setValue(searchValue);

    const normalizedFilter = searchValue.toLowerCase();
    debouncedFilter(normalizedFilter);
  };

  return (
    <div className={styles.Search}>
      <TextField
        type="text"
        label="Search"
        variant="outlined"
        value={value}
        onChange={onChangeFilter}
      />
    </div>
  );
};

export default Search;
