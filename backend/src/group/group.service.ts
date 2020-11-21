import { Injectable } from '@nestjs/common';
import { Action } from 'rxjs/internal/scheduler/Action';
import { DbService } from 'src/db/db.service';

@Injectable()
export class GroupService {
  constructor(private dbService: DbService) {}
  async getGroupLists(uid: string): Promise<Group[]> {
    console.log(uid);
    console.log(`----groups`);
    const query = `SELECT * FROM scheduler_db.Groups WHERE owner_id = "${uid}"`;
    const groups = await this.dbService.doGetQuery(query);
    if (groups) {
      return groups as Group[];
    } else {
      return [];
    }
  }

  async addGroup(ownerId: string, groupName: string): Promise<ActionResult> {
    const groupId = this.dbService.getUniqueString();
    const createTime = this.dbService.getCurrentTime();
    const query = `
        INSERT INTO scheduler_db.Groups (group_id, group_name, owner_id, create_time)
        VALUES ("${groupId}", "${groupName}", "${ownerId}", ${createTime});
      `;

    const dbResult = await this.dbService.doWriteQuery(query);
    console.log(`adding group query :  ${query} has done`, dbResult);

    return {
      ok: true,
      message: `successfully create new Group ${groupName}`,
    };
  }
}
