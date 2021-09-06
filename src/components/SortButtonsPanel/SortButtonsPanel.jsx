import { useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import {
  CheckBox,
  CheckBoxOutlineBlank,
  PlaylistAddCheck,
  ArrowDownward,
  ArrowUpward,
  History,
} from '@material-ui/icons';

import styles from './SortButtonsPanel.module.scss';

const SortButtonsPanel = ({ items, onClicks }) => {
  const { allItems, completeItems, notCompleteItems } = items;
  const { handleClickSort, handleChooseCompleted, handleClickAllTodos } =
    onClicks;
  const [classCheckedSort, setClassCheckedSort] = useState('byDefault');
  const [classCheckedCompleted, setClassCheckedCompleted] = useState('all');

  return (
    <div className={styles.buttonsWrapper}>
      <ButtonGroup variant="text" color="primary" aria-label="button group">
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
      </ButtonGroup>

      <ButtonGroup variant="text" color="primary" aria-label="button group">
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
      </ButtonGroup>
    </div>
  );
};

export default SortButtonsPanel;
