import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql';
import { dbHost, dbPassword } from 'src/secret/secrets';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DbService {
  dbInstance = mysql;

  connectOptions: mysql.ConnectionConfig = {
    host: dbHost,
    // socketPath: '/var/run/mysqld/mysqld.sock',
    port: 3306,
    user: 'root',
    password: dbPassword,
    database: 'scheduler_db',
  };

  async doGetQuery<T>(query: string): Promise<T[]> {
    console.log(`get query with ${query}`);

    const queryResult = await new Promise<T[]>((res, reject) => {
      const connection = mysql.createConnection(this.connectOptions);
      connection.connect(err => {
        if (err) {
          reject(err);
          return;
        }

        connection.query(query, (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          connection.end();
          if (results) {
            res(results);
          } else {
            res([]);
          }
          return;
        });
      });
    });

    return queryResult;
  }

  async doWriteQuery(query: string): Promise<ActionResult> {
    console.log(`write query with ${query}`);
    const queryResult = await new Promise<ActionResult>((res, rej) => {
      const connection = mysql.createConnection(this.connectOptions);
      connection.query(query, (err, results) => {
        if (err) {
          rej(err);
        }

        res({
          ok: true,
          message: `successfully done query ${query}`,
        });
      });
    });

    console.log(`writing query done`);
    return queryResult;
  }

  getUniqueString(): string {
    return uuidv4();
  }

  getCurrentTime(): number {
    return new Date().getTime();
  }
}
