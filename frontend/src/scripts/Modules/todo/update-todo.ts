import { serverUrl } from "../../app";
import { doPutRequest } from "..//http";

export async function updateTodo(todo: Todo): Promise<ActionResult> {
  const url = `${serverUrl}/todos/${todo.todo_id}`;
  const result = await doPutRequest<ActionResult>({
    url,
    body: todo,
  });

  return result;
}
