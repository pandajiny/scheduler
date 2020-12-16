import { serverUrl } from "../../App";
import { doPutRequest } from "../HttpsModles";

export async function updateGroup(group: Group): Promise<ActionResult> {
  const url = `${serverUrl}/users/${group.owner_id}/groups/${group.group_id}`;
  const result = await doPutRequest<ActionResult>({
    url,
    body: group,
  });

  return result;
}
