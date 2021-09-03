export const getTodosByOnePage = state => state.todos.items;
export const getAllItems = state => state.todos.allItems;
export const getTotalTodos = state => state.todos.itemsByPageLength;
export const getFilter = state => state.todos.filter;

export const getCompleteItems = state =>
  getAllItems(state).filter(({ isDone }) => isDone);
export const getNotCompleteItems = state =>
  getAllItems(state).filter(({ isDone }) => !isDone);
