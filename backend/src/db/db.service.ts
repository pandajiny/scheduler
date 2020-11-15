import { Injectable } from '@nestjs/common';
import { SSL_OP_NO_QUERY_MTU } from 'constants';
import * as mysql from 'mysql';
import { dbHost, dbPassword } from 'src/secret/secrets';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DbService {
  dbInstance = mysql;

  connectOptions = {
    host: dbHost,
    port: 3306,
    user: 'root',
    password: dbPassword,
    insecureAuth: true,
    database: 'scheduler_db',
  };

  async doGetQuery<T>(query: string): Promise<T[] | null> {
    console.log(`get query with ${query}`);
    // const queryResult = await new Promise<T[]>((res, rej) => {
    //   this.connection.connect(err => {
    //     if (err) throw err;
    //     this.connection.query<T[]>(query, (err, results) => {
    //       if (err) {
    //         console.log(`---------------`);
    //         throw err;
    //       }
    //       res(results);
    //     });
    //   });
    // });

    const queryResult = await new Promise<T[]>((res, rej) => {
      const connection = mysql.createConnection(this.connectOptions);
      connection.connect(err => {
        if (err) rej(err);
        connection.query(query, (err, results) => {
          if (err) rej(err);
          connection.end();
          res(results);
        });
      });
    }).catch(err => {
      console.log(`------catched`);
      console.log(err);
      throw err;
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
}
