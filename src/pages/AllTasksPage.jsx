import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AllTasksTable from 'components/AllTasksTable';
import { getTasks } from 'redux/admin/admin-operations';
import { getAllTasks } from 'redux/admin/admin-selectors';

const AllTasksPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(getAllTasks);

  useEffect(() => dispatch(getTasks()), [dispatch]);

  return <AllTasksTable tasks={tasks} />;
};

export default AllTasksPage;
