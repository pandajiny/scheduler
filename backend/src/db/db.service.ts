import { Injectable } from '@nestjs/common';
// import * as sqlite_module from 'sqlite3';
// const sqlite = sqlite_module.verbose();
import * as mysql from 'mysql';
import { dbHost, dbPassword } from 'src/auth/secrets';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DbService {
  connection = mysql.createConnection({
    host: dbHost,
    port: 3306,
    user: 'root',
    password: dbPassword,
    insecureAuth: true,
    database: 'scheduler_db',
  });

  // async doGetQuery<T>(query: string): Promise<T[] | null> {
  //   return new Promise(resolve => {
  //     console.log(`do query : ${query}`);
  //     const db = new sqlite.Database('jinius-scheduler.db');

  //     db.all(query, (err, rows) => {
  //       if (err) {
  //         throw err;
  //       }

  //       if (rows.length > 0) {
  //         resolve(rows);
  //       } else {
  //         resolve(null);
  //       }
  //       return;
  //     });

  //     db.close();
  //   });
  // }
  async doGetQuery<T>(query: string): Promise<T[] | null> {
    return new Promise((res, rej) => {
      this.connection.query(query, (err, results) => {
        if (err) {
          rej(err);
        }

        res(results);
      });
    });
  }

  // async doWriteQuery(query: string): Promise<ActionResult> {
  //   return new Promise((resolve, reject) => {
  //     console.log(`do write query`, query);
  //     const db = new sqlite.Database('jinius-scheduler.db', err => {
  //       if (err) {
  //         throw err;
  //       }
  //     });

  //     db.exec(query, err => {
  //       if (err) {
  //         console.log(`error found dd`);
  //         reject(err);
  //         return;
  //       }

  //       console.log(`successfully done query ${query}`);
  //       resolve({
  //         ok: true,
  //         message: `successfully done query ${query}`,
  //       });
  //       return;
  //     });
  //     db.close();
  //   })
  // }
  async doWriteQuery(query: string): Promise<ActionResult> {
    return new Promise((res, rej) => {
      this.connection.query(query, (err, results) => {
        if (err) {
          rej(err);
        }

        res({
          ok: true,
          message: `successfully done query ${query}`,
        });
      });
    });
  }

  getUniqueString(): string {
    return uuidv4();
  }
}
