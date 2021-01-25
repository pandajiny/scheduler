export * from "./get-todo";
export * from "./add-todo";
export * from "./delete-todo";
export * from "./update-todo";

// export function getFilter(userId: string): TodosFilter {
//   if (!userId) {
//     throw new Error("Cannot parse user id");
//   }
//   const filter: TodosFilter = {
//     userId,
//   };

//   const groupId = urlParams.get("group_id");
//   if (groupId) {
//     filter.groupId = groupId;
//   }
//   return filter;
// }
