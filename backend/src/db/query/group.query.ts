import { DB_TABLES, getUniqueString } from '.';

export const selectGroupsQuery = (condition: { uid: string }): string => {
  const { uid } = condition;
  return `
    SELECT ${DB_TABLES.TODO_GROUP_TABLE}.*, count(${DB_TABLES.TODO_TABLE}.todo_id) as item_count
    FROM ${DB_TABLES.TODO_GROUP_TABLE}
    LEFT JOIN ${DB_TABLES.TODO_TABLE}
    ON ${DB_TABLES.TODO_GROUP_TABLE}.group_id = ${DB_TABLES.TODO_TABLE}.group_id
    WHERE ${DB_TABLES.TODO_GROUP_TABLE}.owner_id = "${uid}"
    GROUP BY ${DB_TABLES.TODO_GROUP_TABLE}.group_id;
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
