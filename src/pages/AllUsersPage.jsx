import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UsersList from 'components/UsersList';
import { getUsers } from 'redux/admin/admin-operations';
import { getAllUsers } from 'redux/admin/admin-selectors';

const AllUsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);

  useEffect(() => dispatch(getUsers()), [dispatch]);

  return <UsersList users={users} />;
};

export default AllUsersPage;
