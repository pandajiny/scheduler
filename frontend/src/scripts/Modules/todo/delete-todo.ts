import { serverUrl } from "../../app";
import { doDeleteRequest } from "..//http";

export async function deleteTodo(todoId: string): Promise<ActionResult> {
  const url = `${serverUrl}/todos/${todoId}`;
  const result = await doDeleteRequest<ActionResult>({
    url,
  });
  return result;
}
