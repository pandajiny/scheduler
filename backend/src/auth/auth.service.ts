import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { createHmac } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // async validateUser(request: HashedLoginRequest): Promise<User> {
  //   console.log(`validate user`);
  //   const { email, _password } = request;
  //   const password = this.hashPassword(_password);
  //   const user = await this.usersService.findUser({ email });

  //   if (!user) {
  //     throw `Can't find user from email`;
  //   }

  //   if (user._password != password) {
  //     throw `Password incorrect`;
  //   }

  //   return user;
  // }

  // hashPassword(_password: string): string {
  //   return createHmac('sha256', jwtConstants.secret)
  //     .update(_password)
  //     .digest('hex');
  // }

  // getToken(user: User): LoginResult {
  //   const payload: JwtPayload = { email: user.email, uid: user.uid };
  //   const token = this.jwtService.sign(payload);
  //   console.log(`tokken issued : ${token} with payload`, payload);
  //   return {
  //     access_token: token,
  //   };
  // }

  // async doSignup(props: {
  //   name: string;
  //   email: string;
  //   _password: string;
  // }): Promise<LoginResult> {
  //   const { email, name, _password } = props;
  //   // const user = await this.usersService.createUser({ email, name, _password });
  //   // return this.getToken(user);
  // }
}
