import { SchedulerService } from "../../app";
import { parseErrorResponse } from "../http";

export async function getGroupsFromUid(uid?: string): Promise<GroupDTO[]> {
  return await SchedulerService.get<GroupDTO[]>(`/groups`, {
    params: { uid },
  })
    .then((resp) => resp.data)
    .catch((err) => {
      throw parseErrorResponse(err).message;
    });
}
