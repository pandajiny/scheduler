import { serverUrl } from "../../App";
import { doDeleteRequest } from "../HttpsModles";

export async function deleteGroup(userId: string, groupId: string) {
  const url = `${serverUrl}/users/${userId}/groups/${groupId}`;
  const result = await doDeleteRequest<ActionResult>({
    url,
  });
  return result;
}
