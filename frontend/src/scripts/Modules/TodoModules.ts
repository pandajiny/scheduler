import { serverUrl } from "../App";
import {
  doDeleteRequest,
  doGetRequest,
  doPostRequest,
  doPutRequest,
} from "./HttpsModles";

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

export async function editTodo(todo: Todo): Promise<ActionResult> {
  const url = `${serverUrl}/todos/${todo.todo_id}`;
  const result = await doPutRequest<ActionResult>({
    url,
    body: todo,
  });

  return result;
}

export async function deleteTodo(todoId: string): Promise<ActionResult> {
  const url = `${serverUrl}/todos/${todoId}`;
  const result = await doDeleteRequest<ActionResult>({
    url,
  });
  return result;
}

export function getEndTimeListFromTodos(
  todoItems: Todo[]
): Array<number | null> {
  return [...new Set(todoItems.map((todoItem) => todoItem.limit_datetime))];
}

export async function getGroupsFromUser(userId: string): Promise<Group[]> {
  const url = `${serverUrl}/users/${userId}/groups`;
  const groups = await doGetRequest<Group[]>(url);
  return groups;
}

export async function addGroup(props: {
  userId: string;
  groupName: string;
}): Promise<ActionResult> {
  const { groupName, userId } = props;
  console.log(`add group with : ${groupName}`);
  const url = `${serverUrl}/users/${userId}/groups`;

  const request: AddGroupRequest = {
    groupName,
  };
  const result = await doPostRequest<ActionResult>({
    url,
    body: request,
  });

  console.log(`add group done, ${result.message}`);
  return result;
}
