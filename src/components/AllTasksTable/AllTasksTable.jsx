import { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Delete, CheckCircleOutline } from '@material-ui/icons';

import {
  deleteTaskByAdmin,
  updateTodoByAdmin,
} from 'redux/admin/admin-operations';

const AllTasksTable = ({ tasks }) => {
  const dispatch = useDispatch();
  const tasksForTable = tasks.map(task => {
    return { ...task, id: task._id };
  });

  const deleteTask = useCallback(
    (ownerId, taskId) => () => dispatch(deleteTaskByAdmin(ownerId, taskId)),
    [dispatch],
  );

  const changeCompletedStatus = useCallback(
    (ownerId, taskId, isDone) => () =>
      dispatch(updateTodoByAdmin(ownerId, taskId, { isDone: !isDone })),
    [dispatch],
  );

  const updateHandler = useCallback(
    ({ id, field, value, row }) => {
      console.log('row', row);
      const sameDescr = field === 'description' && row.description !== value;
      const sameIsDone = field === 'isDone' && row.isDone !== value;
      if (sameDescr || sameIsDone) {
        dispatch(updateTodoByAdmin(row.owner, id, { [field]: value }));
      }
    },
    [dispatch],
  );

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        hide: true,
      },
      {
        field: 'owner',
        headerName: 'Owner',
        width: 110,
      },
      {
        field: 'description',
        headerName: 'Description',
        width: 150,
        editable: true,
      },
      {
        field: 'isDone',
        headerName: 'Completed',
        type: 'boolean',
        width: 100,
        editable: true,
      },

      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width: 80,
        getActions: params => [
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={deleteTask(params.row.owner, params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<CheckCircleOutline />}
            label="Change Completed"
            onClick={changeCompletedStatus(
              params.row.owner,
              params.id,
              params.row.isDone,
            )}
            showInMenu
          />,
        ],
      },
    ],
    [deleteTask, changeCompletedStatus],
  );
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tasksForTable}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        checkboxSelection
        disableSelectionOnClick
        onCellEditCommit={updateHandler}
      />
    </div>
  );
};

export default AllTasksTable;
