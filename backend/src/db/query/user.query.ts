import { DB_TABLES } from '.';

export const createUserQuery = (user: User): string => {
  const { email, name, uid } = user;
  return `
    INSERT INTO ${DB_TABLES.USER_TABLE}
    (uid, name, email, _password)
    VALUES
    ("${uid}","${name}","${email}","$");
    `;
};

export const selectUserQuery = (condition: {
  uid?: string;
  email?: string;
}): string => {
  const { email, uid } = condition;

  if (email && uid) {
    return `SELECT * FROM ${DB_TABLES.USER_TABLE} WHERE uid="${uid} AND email=${email}"`;
  }

  if (email) {
    return `SELECT * FROM ${DB_TABLES.USER_TABLE} WHERE email="${email}"`;
  }

  if (uid) {
    return `SELECT * FROM ${DB_TABLES.USER_TABLE} WHERE uid="${uid}"`;
  }

  return `SELECT * FROM ${DB_TABLES.USER_TABLE} WHERE FALSE`;
};

export const updateUserQuery = (user: User) => {
  const { email, name, uid } = user;
  const query = `
    UPDATE ${DB_TABLES.USER_TABLE} SET

    email="${email}",
    name="${name}"

    WHERE uid="${uid}"
  `;

  return query;
};
