import { v4 as uuidv4 } from 'uuid';

export function getCurrentTime(): number {
  return new Date().getTime();
}

export function getUniqueString(): string {
  return uuidv4();
}

export type DbName = 'scheduler_db';
export const DB_NAMES: { [key: string]: DbName } = {
  SCHEDULER_DB: `scheduler_db`,
};

export type TableName = `todos` | `todo_groups` | `users`;
export const DB_TABLES = {
  TODO_TABLE: 'todos',
  TODO_GROUP_TABLE: 'todo_groups',
};

export * from './todo.query';
export * from './group.query';
