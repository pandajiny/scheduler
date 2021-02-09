import { SchedulerService } from "../../script";
import { parseErrorResponse } from "../http";

export async function getGroupsFromUid(uid?: string): Promise<Group[]> {
  return await SchedulerService.get<Group[]>(`/groups`, {
    params: { uid },
  })
    .then((resp) => resp.data)
    .catch((err) => {
      throw parseErrorResponse(err).message;
    });
}
