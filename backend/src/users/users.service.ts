import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { DbService } from 'src/db/db.service';
import { DB_NAMES, getUniqueString } from 'src/db/query';
@Injectable()
export class UsersService {
  constructor(private dbService: DbService) {}

  async addUser(request: HashedSignUpRequest): Promise<User> {
    const { name, email, _password } = request;

    const uid = getUniqueString();
    const query = `
      INSERT INTO users
      (uid, name, email, _password)
      VALUES ("${uid}","${name}","${email}","${_password}")
    `;

    if (await this.findUserFromEmail(email)) {
      throw `User already exist ${email}`;
    }

    const result = await this.dbService
      .doWriteQuery(query, 'scheduler_db')
      .catch(err => {
        console.log(err);
        throw `Can't create user`;
      });

    console.log(`successfully created user ${result.message}`);

    const user: User = {
      uid,
      name,
      email,
      _password,
    };

    return user;
  }

  async findUserFromEmail(email: string): Promise<User | null> {
    const query = `SELECT * FROM users WHERE email = "${email}"`;
    return await this.dbService
      .doGetQuery<User>(query, DB_NAMES.SCHEDULER_DB)
      .then(users => {
        return users && users[0] ? users[0] : null;
      })
      .catch(err => {
        console.error(err);
        throw `Database Error`;
      });
  }

  async isUserExist(uid: string): Promise<boolean> {
    const query = `SELECT email FROM users WHERE uid = "${uid}"`;
    const result = await this.dbService.doGetQuery(query, 'scheduler_db');
    if (result.length == 1) {
      return true;
    } else {
      return false;
    }
  }
}
