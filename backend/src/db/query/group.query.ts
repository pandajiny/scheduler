import { DB_TABLES, getUniqueString } from '.';

export const selectGroupsQuery = (condition: { uid: string }): string => {
  const { uid } = condition;
  return `
    SELECT groups.*, count(todos.todo_id) as item_count
    FROM ${DB_TABLES.TODO_GROUP_TABLE} groups
    LEFT JOIN ${DB_TABLES.TODO_TABLE} todos
    ON groups.group_id = todos.group_id
    WHERE groups.owner_id = "${uid}"
    GROUP BY groups.group_id;
  `;
};

export const selectGroupQuery = (groupId: string): string => {
  return `
    SELECT *
    FROM ${DB_TABLES.TODO_GROUP_TABLE}
    WHERE group_id="${groupId}";
  `;
};

export const insertGroupQuery = (condition: AddGroupRequest): string => {
  const { groupName, userId } = condition;
  const groupId = getUniqueString();
  const createTime = new Date().getTime();

  const query = `
    INSERT INTO todo_groups
    (group_id, group_name, owner_id, create_time)
    VALUES ("${groupId}", "${groupName}", "${userId}", ${createTime});
  `;

  return query;
};

export function getDeleteGroupQuery(args: { groupId: string }): string {
  const { groupId } = args;
  return `
    DELETE FROM ${DB_TABLES.TODO_GROUP_TABLE}
    WHERE group_id = "${groupId}"
  `;
}
