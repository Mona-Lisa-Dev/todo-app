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

  return (
    <div className={styles.buttonsWrapper}>
      <ButtonGroup
        variant="text"
        color="primary"
        aria-label="text primary button group"
      >
        <Button
          type="button"
          title="All todos"
          onClick={handleClickAllTodos}
          startIcon={<PlaylistAddCheck />}
        >
          {allItems.length}
        </Button>
        <Button
          type="button"
          title="Completed todos"
          onClick={() => handleChooseCompleted(true)}
          startIcon={<CheckBox />}
        >
          {completeItems.length}
        </Button>
        <Button
          type="button"
          title="Not completed todos"
          onClick={() => handleChooseCompleted(false)}
          startIcon={<CheckBoxOutlineBlank />}
        >
          {notCompleteItems.length}
        </Button>
      </ButtonGroup>

      <ButtonGroup
        variant="text"
        color="primary"
        aria-label="text primary button group"
      >
        <Button
          type="button"
          title="Alphabetical sorting"
          onClick={() => handleClickSort('sortBy')}
        >
          <ArrowUpward />
        </Button>
        <Button
          type="button"
          title="Alphabetical sorting in reverse"
          onClick={() => handleClickSort('sortByDesc')}
        >
          <ArrowDownward />
        </Button>
        <Button
          type="button"
          title="Sort by default"
          onClick={() => handleClickSort('')}
        >
          <History />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default SortButtonsPanel;
