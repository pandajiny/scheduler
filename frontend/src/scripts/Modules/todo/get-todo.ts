import { serverUrl } from "../../app";
import { doGetRequest } from "../http";

export async function getTodos(filter: TodosFilter): Promise<Todo[]> {
  let url = `${serverUrl}/todos?user_id=${filter.userId}`;
  if (filter.groupId) {
    url += `&group_id=${filter.groupId}`;
  }

  const todos = await doGetRequest<Todo[]>(url);
  return todos;
}

export async function getTodo(todoId: string): Promise<Todo> {
  const url = `${serverUrl}/todos/${todoId}`;

  const todo = await doGetRequest<Todo>(url);
  return todo;
}
