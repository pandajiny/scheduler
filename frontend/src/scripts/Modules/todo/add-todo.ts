import { serverUrl } from "../../app";
import { doPostRequest } from "..//http";

export const addTodo = async (
  request: AddTodoRequest
): Promise<ActionResult> => {
  const url = `${serverUrl}/todos`;
  const result = await doPostRequest<ActionResult>({
    url,
    body: request,
  });

  return result;
};
