import { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router';
import {
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
} from '@material-ui/core';
import { useIntl } from 'react-intl';
import { translate } from 'i18n';
import routes from 'routes';
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

  const history = useHistory();
  const location = useLocation();

  const handleChangeStatus = e => {
    const { value } = e.target;
    setStatus(value);

    switch (value) {
      case 'all':
        handleClickAllTodos();

        if (sortBy) {
          history.push({
            ...location,
            pathname: `${routes.todos}/${sortBy}`,
          });
        } else {
          history.push({
            ...location,
            pathname: routes.todos,
          });
        }

        break;
      case 'completed':
        handleChooseCompleted(true);

        if (sortBy) {
          history.push({
            ...location,
            pathname: `${routes.todos}/completed/${sortBy}`,
          });
        } else {
          history.push({
            ...location,
            pathname: `${routes.todos}/completed`,
          });
        }

        break;
      case 'not completed':
        handleChooseCompleted(false);

        if (sortBy) {
          history.push({
            ...location,
            pathname: `${routes.todos}/not_completed/${sortBy}`,
          });
        } else {
          history.push({
            ...location,
            pathname: `${routes.todos}/not_completed`,
          });
        }

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

        if (byStatus) {
          history.push({
            ...location,
            pathname: `${routes.todos}/${
              completed ? 'completed' : 'not_completed'
            }`,
          });
        } else {
          history.push({
            ...location,
            pathname: routes.todos,
          });
        }

        break;
      case 'sortBy':
        handleClickSort('sortBy');

        if (byStatus) {
          history.push({
            ...location,
            pathname: `${routes.todos}/${
              completed ? 'completed' : 'not_completed'
            }/sortBy`,
          });
        } else {
          history.push({
            ...location,
            pathname: `${routes.todos}/sortBy`,
          });
        }

        break;
      case 'sortByDesc':
        handleClickSort('sortByDesc');

        if (byStatus) {
          history.push({
            ...location,
            pathname: `${routes.todos}/${
              completed ? 'completed' : 'not_completed'
            }/sortByDesc`,
          });
        } else {
          history.push({
            ...location,
            pathname: `${routes.todos}/sortByDesc`,
          });
        }

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
  completed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
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
