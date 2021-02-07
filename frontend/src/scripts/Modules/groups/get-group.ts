import axios from "axios";
import { parseErrorResponse } from "../http";

export async function getGroupsFromUid(uid: string): Promise<Group[]> {
  return await await axios
    .get<Group[]>(`/scheduler/groups`, { params: { uid } })
    .then((resp) => resp.data)
    .catch((err) => {
      throw parseErrorResponse(err).message;
    });
}
