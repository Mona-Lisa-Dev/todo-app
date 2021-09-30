// todo
// import PropTypes from 'prop-types';
// import { translate } from 'i18n';

import { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Delete, Security, CheckCircleOutline } from '@material-ui/icons';

import {
  deleteUser,
  updateUser,
  updateCompleted,
} from 'redux/admin/admin-operations';

const UsersList = ({ users }) => {
  const dispatch = useDispatch();

  const deleteHandler = useCallback(
    id => () => dispatch(deleteUser(id)),
    [dispatch],
  );

  const updateCompletedHandler = useCallback(
    (id, completed) => () =>
      dispatch(updateCompleted(id, { completed: !completed })),
    [dispatch],
  );

  const changeAdminHandler = useCallback(
    (id, role) => () => {
      dispatch(updateUser(id, { role: role === 'admin' ? 'user' : 'admin' }));
    },
    [dispatch],
  );

  const updateHandler = useCallback(
    ({ id, field, value }) => dispatch(updateUser(id, { [field]: value })),
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
        field: 'name',
        headerName: 'Name',
        width: 150,
        // editable: true,
      },
      {
        field: 'email',
        headerName: 'E-mail',
        width: 150,
        // editable: true,
      },
      {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        // editable: true,
      },
      {
        field: 'role',
        headerName: 'Role',
        width: 100,
        // editable: true,
      },
      {
        field: 'completed',
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
            onClick={deleteHandler(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<CheckCircleOutline />}
            label="Update completed"
            onClick={updateCompletedHandler(params.id, params.row.completed)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<Security />}
            label="Change Admin"
            onClick={changeAdminHandler(params.id, params.row.role)}
            showInMenu
          />,
        ],
      },
    ],
    [deleteHandler, updateCompletedHandler, changeAdminHandler],
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onCellEditCommit={updateHandler}
      />
    </div>
  );
};

export default UsersList;
