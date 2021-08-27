// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { List } from '@material-ui/core';

// import TodoItem from 'components/TodoItem';
// import PaginationTodos from 'components/PaginationTodos';
// import { getTodos, getTodosByOnePage } from 'redux/todos/todos-selectors';
// import { getTodosByPage } from 'redux/todos/todos-operations';

// const TodoList = ({ ITEMS_ON_PAGE }) => {
//   const todos = useSelector(getTodos);
//   const todosToShow = useSelector(getTodosByOnePage);
//   const dispatch = useDispatch();

//   const count = Math.ceil(todos.length / ITEMS_ON_PAGE);
//   const renderPagination = todos.length > ITEMS_ON_PAGE;

//   useEffect(
//     () => !renderPagination && dispatch(getTodosByPage(ITEMS_ON_PAGE, 0)),
//     [ITEMS_ON_PAGE, dispatch, renderPagination, todos],
//   );

//   return (
//     <>
//       <List>
//         {todosToShow?.map(todo => (
//           <TodoItem key={todo._id} todo={todo} />
//         ))}
//       </List>
//       {renderPagination && (
//         <PaginationTodos
//           todos={todos}
//           itemsOnPage={ITEMS_ON_PAGE}
//           count={count}
//         />
//       )}
//     </>
//   );
// };

// export default TodoList;

import { List } from '@material-ui/core';
import TodoItem from 'components/TodoItem';

const TodoList = ({ todosToShow }) => {
  return (
    <List>
      {todosToShow?.map(todo => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </List>
  );
};

export default TodoList;
