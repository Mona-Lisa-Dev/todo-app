export const getTodosByOnePage = state => state.todos.items;
export const getTotalTodos = state => state.todos.itemsLength;
export const getLengthForPagination = state => state.todos.itemsForPagination;
export const getFilterValue = state => state.todos.filterValue;
export const getDateValue = state => state.todos.dateValue;

export const getLoadingTodos = state => state.todos.isLoading;

export const getCompleteTodos = state => state.todos.completeItems;
export const getNotCompleteTodos = state => state.todos.notCompleteItems;
