import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { DbService } from 'src/db/db.service';
@Injectable()
export class UsersService {
  constructor(private dbService: DbService) {}

  async addUser(request: HashedSignUpRequest): Promise<User> {
    const { name, email, _password } = request;

    const uid = this.dbService.getUniqueString();
    const query = `
      INSERT INTO users
      (uid, name, email, _password)
      VALUES ("${uid}","${name}","${email}","${_password}")
    `;

    const result = await this.dbService.doWriteQuery(query, 'scheduler_db');
    console.log(`successfully created user ${result.message}`);

    const user: User = {
      uid,
      name,
      email,
      _password,
    };

    return user;
  }

  async findUserFromEmail(email: string): Promise<User> {
    const query = `SELECT * FROM users WHERE email = "${email}"`;
    return await this.dbService
      .doGetQuery<User>(query, 'scheduler_db')
      .then(user => {
        if (user && user[0]) {
          return user[0];
        } else {
          throw `User who using ${email} not Exist`;
        }
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
