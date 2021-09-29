import { useMemo, useCallback } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Delete, CheckCircleOutline } from '@material-ui/icons';

const AllTasksTable = ({ tasks }) => {
  const tasksForTable = tasks.map(task => {
    return { ...task, id: task._id };
  });

  const deleteTask = useCallback(
    id => () => {
      console.log('delete');
    },
    [],
  );

  const changeCompletedStatus = useCallback(
    id => () => console.log('change'),
    [],
  );

  const updateHandler = useCallback(
    ({ id, field, value }) => console.log('update'),
    [],
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
            onClick={deleteTask(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<CheckCircleOutline />}
            label="Change Completed"
            onClick={changeCompletedStatus(params.id)}
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
