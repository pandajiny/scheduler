import { serverUrl } from "../../app";
import { doGetRequest } from "..//http";

export async function getGroupsFromUser(userId: string): Promise<Group[]> {
  const url = `${serverUrl}/users/${userId}/groups`;
  const groups = await doGetRequest<Group[]>(url);
  return groups;
}
