import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { createHmac } from 'crypto';
import { jwtConstants } from './secrets';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(request: HashedLoginRequest): Promise<User> {
    console.log(`validate user for login`);
    const { email, _password } = request;
    const password = this.hashPassword(_password);
    const user = await this.usersService.findUserFromEmail(email);

    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    if (user._password != password) {
      throw new HttpException('password incorrect', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  hashPassword(_password: string): string {
    return createHmac('sha256', jwtConstants.secret)
      .update(_password)
      .digest('hex');
  }

  async doLogin(user: User): Promise<LoginResult> {
    console.log(`login with`, user);
    const payload: JwtPayload = { email: user.email, uid: user.uid };
    const token = this.jwtService.sign(payload);
    console.log(`tokken issued : ${token} with payload`, payload);
    return {
      access_token: token,
    };
  }

  async doSignup(props: {
    name: string;
    email: string;
    _password: string;
  }): Promise<LoginResult> {
    console.log(`signup with`, props);
    const { email, name, _password } = props;
    const user = await this.usersService.addUser({ email, name, _password });
    return this.doLogin(user);
  }
}
