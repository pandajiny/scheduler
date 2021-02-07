import { Global, Injectable } from '@nestjs/common';
import axios from 'axios';
import { DbService } from 'src/db/db.service';
import { selectUserQuery } from 'src/db/query';
@Injectable()
export class UsersService {
  constructor(private dbService: DbService) {}

  async findUserFromUid(uid: string): Promise<User | null> {
    return await axios
      .get<User>(`http://localhost:4000/user?uid=${uid}`, {})
      .then(resp => resp.data);
  }

  async isUserExist(uid: string): Promise<boolean> {
    const query = selectUserQuery({ uid });
    const users = await this.dbService.get<User>(query);
    return users.length == 1 && users[0].uid == uid ? true : false;
  }
}
