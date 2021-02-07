import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { DB_TABLES } from 'src/db/query';
import {
  insertGroupQuery,
  selectGroupQuery,
  selectGroupsQuery,
} from 'src/db/query/group.query';

@Injectable()
export class GroupService {
  constructor(
    private dbService: DbService, // private userService: UsersService,
  ) {}

  async getGroupsFromUid(uid: string): Promise<Group[]> {
    return await this.dbService.get<Group>(selectGroupsQuery({ uid }));
  }

  async getGroupInformation(groupId: string, uid: string): Promise<Group> {
    const group = await this.dbService.get<Group>(selectGroupQuery(groupId));
    if (group[0]) {
      return group[0];
    } else {
      throw new BadRequestException('Cannot get group');
    }
  }

  async addGroup(request: AddGroupRequest) {
    const query = insertGroupQuery(request);
    await this.dbService.write(query).catch(err => {
      console.error(err);
      throw new Error(`Cannot create group.`);
    });
  }

  async deleteGroup(groupId: string) {
    // const query = getDeleteGroupQuery({ groupId });
    // await this.dbService.write(query);
  }

  async updateGroup(group: Group) {
    const { group_id, create_time, group_name, owner_id } = group;
    const query = `
      UPDATE ${DB_TABLES.TODO_GROUP_TABLE} SET
      
      create_time=${create_time},
      group_name="${group_name}",
      owner_id="${owner_id}"

      WHERE group_id = "${group_id}";
    `;

    await this.dbService.write(query);
  }
}
