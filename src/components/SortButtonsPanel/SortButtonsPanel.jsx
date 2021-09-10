import { useState } from 'react';
// import { Button, ButtonGroup } from '@material-ui/core';
// import {
//   CheckBox,
//   CheckBoxOutlineBlank,
//   PlaylistAddCheck,
//   ArrowDownward,
//   ArrowUpward,
//   History,
// } from '@material-ui/icons';

import {
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
} from '@material-ui/core';

import styles from './SortButtonsPanel.module.scss';

const SortButtonsPanel = ({ byStatus, completed, items, onClicks }) => {
  const { todosLength, todosLengthForPagination } = items;
  const { handleClickSort, handleChooseCompleted, handleClickAllTodos } =
    onClicks;

  const [status, setStatus] = useState(
    byStatus ? (completed ? 'completed' : 'not completed') : '',
  );
  const [sort, setSort] = useState('');

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
        <InputLabel htmlFor="status">Status</InputLabel>
        <Select
          native
          value={status}
          onChange={handleChangeStatus}
          label="Status"
          inputProps={{
            name: 'status',
            id: 'status',
          }}
        >
          <option value={'all'}>All</option>
          <option value={'completed'}>Completed</option>
          <option value={'not completed'}>Not completed</option>
        </Select>
        <FormHelperText>
          {todosLengthForPagination} / {todosLength}
        </FormHelperText>
      </FormControl>

      <FormControl className={styles.selectWrapper} variant="outlined">
        <InputLabel htmlFor="sort">Sort</InputLabel>
        <Select
          native
          value={sort}
          onChange={handleChangeSort}
          label="Sort"
          inputProps={{
            name: 'sort',
            id: 'sort',
          }}
        >
          <option value={'byDefault'}>By default</option>
          <option value={'sortBy'}>Alphabetical</option>
          <option value={'sortByDesc'}>Alphabetical in reverse</option>
        </Select>
      </FormControl>

      {/* <ButtonGroup variant="text" color="primary" aria-label="button group">
        <Button
          className={classCheckedCompleted === 'all' && styles.checked}
          type="button"
          title="All todos"
          onClick={() => {
            handleClickAllTodos();
            setClassCheckedCompleted('all');
          }}
          startIcon={<PlaylistAddCheck />}
        >
          {allItems.length}
        </Button>
        <Button
          className={classCheckedCompleted === 'completed' && styles.checked}
          type="button"
          title="Completed todos"
          onClick={() => {
            handleChooseCompleted(true);
            setClassCheckedCompleted('completed');
          }}
          startIcon={<CheckBox />}
        >
          {completeItems.length}
        </Button>
        <Button
          className={classCheckedCompleted === 'notCompleted' && styles.checked}
          type="button"
          title="Not completed todos"
          onClick={() => {
            handleChooseCompleted(false);
            setClassCheckedCompleted('notCompleted');
          }}
          startIcon={<CheckBoxOutlineBlank />}
        >
          {notCompleteItems.length}
        </Button>
      </ButtonGroup> */}

      {/* <ButtonGroup variant="text" color="primary" aria-label="button group">
        <Button
          className={classCheckedSort === 'sortBy' && styles.checked}
          type="button"
          title="Alphabetical sorting"
          onClick={() => {
            handleClickSort('sortBy');
            setClassCheckedSort('sortBy');
          }}
        >
          <ArrowUpward />
        </Button>
        <Button
          className={classCheckedSort === 'sortByDesc' && styles.checked}
          type="button"
          title="Alphabetical sorting in reverse"
          onClick={() => {
            handleClickSort('sortByDesc');
            setClassCheckedSort('sortByDesc');
          }}
        >
          <ArrowDownward />
        </Button>
        <Button
          className={classCheckedSort === 'byDefault' && styles.checked}
          type="button"
          title="Sort by default"
          onClick={() => {
            handleClickSort('');
            setClassCheckedSort('byDefault');
          }}
        >
          <History />
        </Button>
      </ButtonGroup> */}
    </div>
  );
};

export default SortButtonsPanel;
