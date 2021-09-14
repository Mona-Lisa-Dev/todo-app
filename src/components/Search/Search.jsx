import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import _debouce from 'lodash/debounce';

import { TextField, IconButton, useMediaQuery } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';

import Modal from 'components/Modal';
import { getTodosByQuery } from 'redux/todos/todos-operations';
import { clearFilter } from 'redux/todos/todos-actions';

import styles from './Search.module.scss';

const Search = () => {
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const dispatch = useDispatch();

  const handleToggleModal = () => setShowModal(!showModal);

  const fn = searchValue => dispatch(getTodosByQuery(searchValue));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilter = useCallback(_debouce(fn, 500), []);

  const onChangeFilter = e => {
    const searchValue = e.currentTarget.value;
    setValue(searchValue);

    const normalizedFilter = searchValue.toLowerCase();
    debouncedFilter(normalizedFilter);
  };

  const onChangeOnMobile = e => setValue(e.currentTarget.value);
  const onSubmitOnMobile = () => {
    dispatch(getTodosByQuery(value));
    handleToggleModal();
    setClearSearch(true);
  };

  const reset = () => {
    dispatch(clearFilter());
    setValue('');
  };

  const handleMaxWidth = width => {
    return `(max-width:${width}px) `;
  };
  const mobile = useMediaQuery(handleMaxWidth(600));

  return (
    <>
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <form className={styles.searchForm} onSubmit={onSubmitOnMobile}>
            <TextField
              type="text"
              label="Search"
              variant="outlined"
              value={value}
              onChange={onChangeOnMobile}
            />
          </form>
        </Modal>
      )}
      <div className={styles.Search}>
        {mobile ? (
          <>
            <IconButton
              aria-label="Open search"
              type="button"
              color="primary"
              title="Search"
              onClick={handleToggleModal}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              aria-label="Clear search"
              type="button"
              color="primary"
              title="Clear search"
              onClick={reset}
            >
              <Clear />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              aria-label="Clear search"
              type="button"
              color="primary"
              title="Clear search"
              onClick={reset}
            >
              <Clear />
            </IconButton>
            <TextField
              type="text"
              label="Search"
              variant="outlined"
              value={value}
              onChange={onChangeFilter}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Search;
