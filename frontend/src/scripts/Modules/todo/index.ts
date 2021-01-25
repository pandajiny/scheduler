export * from "./get-todo";
export * from "./add-todo";
export * from "./delete-todo";
export * from "./update-todo";

export function getFilter(urlQuery: string): TodosFilter {
  const urlParams = new URLSearchParams(urlQuery);
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
