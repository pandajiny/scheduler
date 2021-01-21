import { serverUrl } from "../../app";
import { doPostRequest } from "..//http";

export async function addGroup(
  request: AddGroupRequest
): Promise<ActionResult> {
  const url = `${serverUrl}/users/${request.userId}/groups`;

  const result = await doPostRequest<ActionResult>({
    url,
    body: request,
  });

  console.log(`add group done, ${result.message}`);
  return result;
}
