import { serverUrl } from "../../App";
import { doDeleteRequest } from "../HttpsModles";

export async function deleteTodo(todoId: string): Promise<ActionResult> {
  const url = `${serverUrl}/todos/${todoId}`;
  const result = await doDeleteRequest<ActionResult>({
    url,
  });
  return result;
}
