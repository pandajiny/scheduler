import { serverUrl } from "../../App";
import { doGetRequest } from "../HttpsModles";

export async function getGroupsFromUser(userId: string): Promise<Group[]> {
  const url = `${serverUrl}/users/${userId}/groups`;
  const groups = await doGetRequest<Group[]>(url);
  return groups;
}
