import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { DB_HOST, DB_PASSWORD, DB_PORT } from 'src/constants';

@Injectable()
export class DbService {
  private readonly connectionOptions: mysql.ConnectionOptions = {
    host: DB_HOST,
    port: parseInt(DB_PORT),
    user: 'root',
    password: DB_PASSWORD,
    database: 'scheduler_db',
  };
  async checkConnection() {
    const conn = await mysql.createConnection(this.connectionOptions);
    await conn.connect();
  }
  async get<T>(query: string): Promise<T[]> {
    const connection = await mysql.createConnection(this.connectionOptions);
    const [rows] = await connection.execute(query).catch(err => {
      console.error(err);
      throw new InternalServerErrorException(err);
    });
    await connection.end();
    return (rows as any[]).map<T>(row => ({ ...row }));
  }

  async write(query: string): Promise<void> {
    const connection = await mysql.createConnection(this.connectionOptions);
    await connection.execute(query).catch(err => {
      console.error(err);
      throw new InternalServerErrorException(err);
    });
    await connection.end();
  }
}
