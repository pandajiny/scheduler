import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql';
import { dbHost, dbPassword } from 'src/secret/secrets';
import { v4 as uuidv4 } from 'uuid';

type DbName = 'scheduler_db';
@Injectable()
export class DbService {
  dbInstance = mysql;

  getConnectOptions(dbName: DbName): mysql.ConnectionConfig {
    return {
      host: dbHost,
      port: 3306,
      user: 'root',
      password: dbPassword,
      database: dbName,
    };
  }

  async doGetQuery<T>(query: string, dbName: DbName): Promise<T[]> {
    console.log(`get query with ${query}`);

    const queryResult = await new Promise<T[]>((res, reject) => {
      const options = this.getConnectOptions(dbName);
      const connection = mysql.createConnection(options);
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

    console.log(`get query done`);
    return queryResult;
  }

  async doWriteQuery(query: string, dbName: DbName): Promise<ActionResult> {
    console.log(`write query with ${query}`);
    const queryResult = await new Promise<ActionResult>((res, rej) => {
      const options = this.getConnectOptions(dbName);
      const connection = mysql.createConnection(options);
      connection.query(query, (err, results) => {
        if (err) {
          rej(err);
          return;
        }

        res({
          ok: true,
          message: `successfully done query ${query}`,
        });
      });
    });
    console.log(`write query done`);
    return queryResult;
  }

  getUniqueString(): string {
    return uuidv4();
  }

  getCurrentTime(): number {
    return new Date().getTime();
  }
}
