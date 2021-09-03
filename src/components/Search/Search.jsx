import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TextField, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { getAllItems } from 'redux/todos/todos-selectors';
import * as todosActions from 'redux/todos/todos-actions';

import styles from './Search.module.scss';

const Search = () => {
  const [value, setValue] = useState('');
  const allItems = useSelector(getAllItems);

  const dispatch = useDispatch();

  const onChangeFilter = e => {
    const searchValue = e.currentTarget.value;
    setValue(searchValue);

    if (!searchValue) {
      const filteredItems = [];
      dispatch(todosActions.changeFilter(filteredItems));
      return;
    }

    const normalizedFilter = searchValue.toLowerCase();

    const filteredItems = allItems.filter(({ description }) =>
      description.toLowerCase().includes(normalizedFilter),
    );

    dispatch(todosActions.changeFilter(filteredItems));
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
      <IconButton
        aria-label="Search"
        type="button"
        variant="contained"
        color="primary"
        title="Search todo"
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default Search;
