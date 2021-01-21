import { DB_TABLES, getUniqueString } from '.';

export function getSelectTodoQuery(args: {
  userId?: string;
  parentId?: string;
  groupId?: string;
}): string {
  const { userId, groupId, parentId } = args;
  let query = `
    SELECT * FROM ${DB_TABLES.TODO_TABLE}
    WHERE todo_id like '%'
  `;

  if (userId) {
    query += `AND owner_user_id = "${userId}"`;
  }

  if (groupId) {
    query += `AND group_id = "${groupId}"`;
  }

  if (parentId) {
    query += `AND parent_todo_id = "${parentId}"`;
  }

  query += `ORDER BY limit_datetime ASC;`;

  return query;
}

export function getInsertTodoQuery(args: { request: AddTodoRequest }): string {
  const todoId = getUniqueString();
  const {
    ownerId,
    content,
    parentTodoId,
    limitDatetime,
    groupId,
  } = args.request;

  const nowDatetime = new Date().getTime();

  return `
      INSERT INTO todos (
        todo_id, owner_user_id, content,
        create_datetime, complete_datetime,
        limit_datetime, parent_todo_id,
        group_id
      )

      VALUES(
        "${todoId}","${ownerId}", "${content}",
        ${nowDatetime}, ${null},
        ${limitDatetime}, "${parentTodoId}",
        "${groupId}"
      );
    `;
}

export function getDeleteTodoQuery(args: { todo_id: string }) {
  const { todo_id } = args;
  return `
      DELETE FROM todos
      WHERE
      todo_id = "${todo_id}";
    `;
}

export function getUpdateTodoQuery(args: { todo: Todo }) {
  const {
    todo_id,
    content,
    create_datetime,
    limit_datetime,
    group_id,
    complete_datetime,
    parent_todo_id,
    owner_user_id,
  } = args.todo;

  return `
        UPDATE todos SET
      
        content = "${content}", create_datetime=${create_datetime},
        limit_datetime= ${limit_datetime}, group_id="${group_id}",
        complete_datetime=${complete_datetime}, parent_todo_id = "${parent_todo_id}",
        owner_user_id="${owner_user_id}"
  
        WHERE todo_id = "${todo_id}"
    `;
}
