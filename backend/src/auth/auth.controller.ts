import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { resourceLimits } from 'worker_threads';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@Request() req): Promise<User> {
    const email = req.user.email;
    console.log(`user information requested from ${email}`);
    const user = await this.usersService.findUserFromEmail(email).catch(err => {
      throw new HttpException(err, HttpStatus.UNAUTHORIZED);
    });

    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(`login requested`, req.user);
    return this.authService.doLogin(req.user).catch(err => {
      throw new HttpException(err, HttpStatus.UNAUTHORIZED);
    });
  }

  @Post('signup')
  async signup(@Body() request: SignUpRequest): Promise<LoginResult> {
    console.log(`signup requested`, request);

    const { email, name, password } = request;
    const _password = this.authService.hashPassword(password);

    const result = await this.authService
      .doSignup({
        email,
        name,
        _password,
      })
      .catch(err => {
        console.log(`Sign up Error`, err);
        throw new HttpException(err, HttpStatus.FORBIDDEN);
      });

    console.log(`signup passed`, result);
    return result;
  }
}
