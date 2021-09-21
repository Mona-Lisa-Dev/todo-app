import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
} from '@material-ui/core';
import { useIntl } from 'react-intl';
import { translate } from 'i18n';
import styles from './SortButtonsPanel.module.scss';

const SortButtonsPanel = ({ sortBy, byStatus, completed, items, onClicks }) => {
  const { todosLength, todosLengthForPagination } = items;
  const { handleClickSort, handleChooseCompleted, handleClickAllTodos } =
    onClicks;

  const [status, setStatus] = useState(
    byStatus ? (completed ? 'completed' : 'not completed') : '',
  );
  const [sort, setSort] = useState(sortBy ? sortBy : 'byDefault');

  const intl = useIntl();

  const handleChangeStatus = e => {
    const { value } = e.target;
    setStatus(value);

    switch (value) {
      case 'all':
        handleClickAllTodos();
        break;
      case 'completed':
        handleChooseCompleted(true);
        break;
      case 'not completed':
        handleChooseCompleted(false);
        break;

      default:
        handleClickAllTodos();
        break;
    }
  };

  const handleChangeSort = e => {
    const { value } = e.target;
    setSort(value);

    switch (value) {
      case 'byDefault':
        handleClickSort('');
        break;
      case 'sortBy':
        handleClickSort('sortBy');
        break;
      case 'sortByDesc':
        handleClickSort('sortByDesc');
        break;

      default:
        handleClickAllTodos();
        break;
    }
  };

  return (
    <div className={styles.buttonsWrapper}>
      <FormControl className={styles.selectWrapper} variant="outlined">
        <InputLabel htmlFor="status">{translate('status')}</InputLabel>
        <Select
          native
          value={status}
          onChange={handleChangeStatus}
          label={translate('status')}
          inputProps={{
            name: 'status',
            id: 'status',
          }}
        >
          <option value={'all'}>{intl.formatMessage({ id: 'all' })}</option>
          <option value={'completed'}>
            {intl.formatMessage({ id: 'completed' })}
          </option>
          <option value={'not completed'}>
            {intl.formatMessage({ id: 'not_completed' })}
          </option>
        </Select>
        <FormHelperText>
          {todosLengthForPagination} / {todosLength}
        </FormHelperText>
      </FormControl>

      <FormControl className={styles.selectWrapper} variant="outlined">
        <InputLabel htmlFor="sort">{translate('sort')}</InputLabel>
        <Select
          native
          value={sort}
          onChange={handleChangeSort}
          label={translate('sort')}
          inputProps={{
            name: 'sort',
            id: 'sort',
          }}
        >
          <option value={'byDefault'}>
            {intl.formatMessage({ id: 'by_default' })}
          </option>
          <option value={'sortBy'}>
            {intl.formatMessage({ id: 'alphabetical' })}
          </option>
          <option value={'sortByDesc'}>
            {intl.formatMessage({ id: 'in_reverse' })}
          </option>
        </Select>
      </FormControl>
    </div>
  );
};

SortButtonsPanel.propTypes = {
  sortBy: PropTypes.string.isRequired,
  byStatus: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
  items: PropTypes.shape({
    todosLength: PropTypes.number.isRequired,
    todosLengthForPagination: PropTypes.number.isRequired,
  }).isRequired,
  onClicks: PropTypes.shape({
    handleClickSort: PropTypes.func.isRequired,
    handleChooseCompleted: PropTypes.func.isRequired,
    handleClickAllTodos: PropTypes.func.isRequired,
  }).isRequired,
};

export default SortButtonsPanel;
