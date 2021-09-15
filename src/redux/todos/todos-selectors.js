export const getTodosByOnePage = state => state.todos.items;
export const getTotalTodos = state => state.todos.itemsLength;
export const getLengthForPagination = state => state.todos.itemsForPagination;
export const getFilter = state => state.todos.filter;
export const getLoadingTodos = state => state.todos.isLoading;

export const getCompleteTodos = state => state.todos.completeItems;
