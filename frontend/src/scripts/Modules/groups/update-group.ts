import { serverUrl } from "../../app";
import { doPutRequest } from "..//http";

export async function updateGroup(group: Group): Promise<ActionResult> {
  const url = `${serverUrl}/users/${group.owner_id}/groups/${group.group_id}`;
  const result = await doPutRequest<ActionResult>({
    url,
    body: group,
  });

  return result;
}
