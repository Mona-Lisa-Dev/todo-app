import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import _debouce from 'lodash/debounce';

import { TextField, IconButton, useMediaQuery } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';

import Modal from 'components/Modal';
import { getTodos } from 'redux/todos/todos-operations';
import { setFilterValue } from 'redux/todos/todos-actions';
import { getFilterValue, getDateValue } from 'redux/todos/todos-selectors';
import { translate } from 'i18n';

import styles from './Search.module.scss';

const Search = ({ limit, offset, byStatus, status, sort }) => {
  const filterValue = useSelector(getFilterValue);
  const dateValue = useSelector(getDateValue);
  const [value, setValue] = useState(filterValue);
  const [showModal, setShowModal] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);
  const dispatch = useDispatch();
  const intl = useIntl();

  const handleToggleModal = () => setShowModal(!showModal);

  const fn = searchValue =>
    dispatch(
      getTodos(
        limit,
        offset,
        byStatus ? status : '',
        sort,
        searchValue,
        dateValue,
      ),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilter = useCallback(_debouce(fn, 500), []);

  const onChangeFilter = e => {
    const searchValue = e.currentTarget.value;
    setValue(searchValue);

    dispatch(setFilterValue(searchValue));

    const normalizedFilter = searchValue.toLowerCase();
    debouncedFilter(normalizedFilter);
  };

  const onChangeOnMobile = e => {
    const searchValue = e.currentTarget.value;
    setValue(searchValue);
    dispatch(setFilterValue(searchValue));
    if (e.currentTarget.value === '') {
      setClearSearch(false);
    }
  };
  const onSubmitOnMobile = () => {
    handleToggleModal();
    // if (value === '') return;
    dispatch(
      getTodos(limit, offset, byStatus ? status : '', sort, value, dateValue),
    );
    setClearSearch(true);
  };

  const reset = async () => {
    await dispatch(setFilterValue(''));
    dispatch(
      getTodos(limit, offset, byStatus ? status : '', sort, '', dateValue),
    );
    setValue('');
    setClearSearch(false);
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
              label={translate('search')}
              variant="outlined"
              value={value}
              onChange={onChangeOnMobile}
            />
            <IconButton
              className={styles.btnSearch}
              aria-label="Search"
              type="submit"
              color="primary"
              title={intl.formatMessage({ id: 'search' })}
            >
              <SearchIcon />
            </IconButton>
          </form>
        </Modal>
      )}
      <div className={styles.Search}>
        {mobile ? (
          <>
            {clearSearch ? (
              <IconButton
                className={styles.btnClearSearch}
                aria-label="Clear search"
                type="button"
                color="primary"
                title={intl.formatMessage({ id: 'clear_search' })}
                onClick={reset}
              >
                <Clear />
              </IconButton>
            ) : (
              <IconButton
                className={styles.btnOpenSearch}
                aria-label="Open search"
                type="button"
                color="primary"
                title={intl.formatMessage({ id: 'search' })}
                onClick={handleToggleModal}
              >
                <SearchIcon />
              </IconButton>
            )}
          </>
        ) : (
          <>
            <IconButton
              className={styles.btnClearSearchDesc}
              aria-label="Clear search"
              type="button"
              color="primary"
              title={intl.formatMessage({ id: 'clear_search' })}
              onClick={reset}
            >
              <Clear />
            </IconButton>
            <TextField
              type="text"
              label={translate('search')}
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
