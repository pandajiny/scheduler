import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // if username and password not exist, return none
    super({ usernameField: 'email', passwordField: 'password' });
  }

  // async validate(email: string, _password: string): Promise<User> {
  //   return await this.authService
  //     .validateUser({
  //       email,
  //       _password,
  //     })
  //     .catch(err => {
  //       throw new UnauthorizedException(err);
  //     });
  // }
}
