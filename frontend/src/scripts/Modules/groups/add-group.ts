import { serverUrl } from "../../App";
import { doPostRequest } from "../HttpsModles";

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
