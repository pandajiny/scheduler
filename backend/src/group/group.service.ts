import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Action } from 'rxjs/internal/scheduler/Action';
import { DbService } from 'src/db/db.service';
import { DB_TABLES, getCurrentTime, getUniqueString } from 'src/db/query';
import { getDeleteGroupQuery } from 'src/db/query/group.query';
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

    if (!(await this.userService.findUser({ uid }))) {
      throw `User not exist`;
    }

    const query = `SELECT * FROM todo_groups WHERE owner_id="${uid}"`;
    const groups = await this.dbService.get<Group>(query, 'scheduler_db');
    return groups;
  }

  async addGroup(request: AddGroupRequest): Promise<ActionResult> {
    const groupId = getUniqueString();
    const createTime = getCurrentTime();
    const { groupName, userId } = request;

    const query = `
        INSERT INTO todo_groups
        (group_id, group_name, owner_id, create_time)
        VALUES ("${groupId}", "${groupName}", "${userId}", ${createTime});
      `;

    const dbResult = await this.dbService.write(query, 'scheduler_db');

    return {
      ok: true,
      message: dbResult.message,
    };
  }

  async deleteGroup(groupId: string): Promise<ActionResult> {
    const query = getDeleteGroupQuery({ groupId });
    const result = await this.dbService.write(query, 'scheduler_db');
    return result;
  }

  async updateGroup(group: Group): Promise<ActionResult> {
    const { group_id, create_time, group_name, owner_id } = group;
    const query = `
      UPDATE ${DB_TABLES.TODO_GROUP_TABLE} SET
      
      create_time=${create_time},
      group_name="${group_name}",
      owner_id="${owner_id}"

      WHERE group_id = "${group_id}";
    `;

    const result = await this.dbService.write(query, 'scheduler_db');
    return result;
  }
}
