export function getFilter(query: string): TodosFilter {
  const urlParams = new URLSearchParams(query);
  const userId = urlParams.get("user_id");
  if (!userId) {
    throw new Error("Cannot parse user id");
  }
  const filter: TodosFilter = {
    userId,
  };
  const groupId = urlParams.get("group_id");
  if (groupId) {
    filter.groupId = groupId;
  }
  return filter;
}

export function getEndTimeListFromTodos(
  todoItems: Todo[]
): Array<number | null> {
  return [...new Set(todoItems.map((todoItem) => todoItem.limit_datetime))];
}
