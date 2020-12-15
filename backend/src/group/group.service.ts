import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Action } from 'rxjs/internal/scheduler/Action';
import { DbService } from 'src/db/db.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GroupService {
  constructor(
    private dbService: DbService,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
  ) {}
  async getGroupsFromUid(uid: string): Promise<Group[]> {
    const isUserExist = await this.userService.isUserExist(uid);
    if (!isUserExist) {
      throw `User Not Exist`;
    }

    const query = `SELECT * FROM todo_groups WHERE owner_id="${uid}"`;
    const groups = await this.dbService.doGetQuery<Group>(
      query,
      'scheduler_db',
    );
    return groups;
  }

  async addGroup(ownerId: string, groupName: string): Promise<ActionResult> {
    const groupId = this.dbService.getUniqueString();
    const createTime = this.dbService.getCurrentTime();

    const query = `
        INSERT INTO todo_groups
        (group_id, group_name, owner_id, create_time)
        VALUES ("${groupId}", "${groupName}", "${ownerId}", ${createTime});
      `;

    const dbResult = await this.dbService.doWriteQuery(query, 'scheduler_db');

    return {
      ok: true,
      message: dbResult.message,
    };
  }
}
