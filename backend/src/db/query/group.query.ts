import { DB_TABLES } from '.';

export function getDeleteGroupQuery(args: { groupId: string }): string {
  const { groupId } = args;
  return `
    DELETE FROM ${DB_TABLES.TODO_GROUP_TABLE}
    WHERE group_id = "${groupId}"
  `;
}
