import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql';
import { dbHost, dbPassword } from 'src/secret/secrets';
import { DbName } from './query';

@Injectable()
export class DbService {
  dbInstance = mysql;

  getConnectOptions(dbName: string): mysql.ConnectionConfig {
    return {
      host: dbHost,
      port: 3306,
      user: 'root',
      password: dbPassword,
      database: dbName,
    };
  }

  async doGetQuery<T>(query: string, dbName: string): Promise<T[]> {
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

  async doWriteQuery(query: string, dbName: string): Promise<ActionResult> {
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
}
