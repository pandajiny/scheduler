import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { DbService } from 'src/db/db.service';
import {
  createUserQuery,
  DB_NAMES,
  getUniqueString,
  selectUserQuery as findUserQuery,
  updateUserQuery,
} from 'src/db/query';
@Injectable()
export class UsersService {
  constructor(private dbService: DbService) {}

  async createUser(request: HashedSignUpRequest): Promise<User> {
    const { name, email, _password } = request;
    if (
      await this.findUser({
        email,
      })
    ) {
      throw `User already exist`;
    }

    const uid = getUniqueString();
    const user: User = {
      uid,
      name,
      email,
      _password,
    };

    const query = createUserQuery(user);
    await this.dbService.write(query, 'scheduler_db').catch(err => {
      console.log(err);
      throw `Can't create user`;
    });
    console.log(`successfully created user`);

    return user;
  }

  async updateUser(user: User) {
    const query = updateUserQuery(user);
    await this.dbService.write(query, DB_NAMES.SCHEDULER_DB).catch(err => {
      console.log(err);
      throw `Can't update User`;
    });
  }

  async findUser(condition: {
    email?: string;
    uid?: string;
  }): Promise<User | null> {
    const query = findUserQuery(condition);
    return await this.dbService
      .get<User>(query, DB_NAMES.SCHEDULER_DB)
      .then(users => {
        if (users.length < 1) {
          return null;
        } else if (users.length > 1) {
          throw `user duplicated`;
        }
        return users && users[0] ? users[0] : null;
      })
      .catch(err => {
        console.error(err);
        throw `Database Error`;
      });
  }

  async isUserExist(uid: string): Promise<boolean> {
    const query = findUserQuery({ uid });
    const users = await this.dbService.get<User>(query, 'scheduler_db');
    return users.length == 1 && users[0].uid == uid ? true : false;
  }
}
