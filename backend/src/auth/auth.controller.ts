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
import { ApiService } from 'src/api/api.service';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private apiService: ApiService,
  ) {}

  // get user information from jwt token
  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@Request() req): Promise<HttpResponse<User>> {
    try {
      const email = req.user.email;
      console.log(`user information requested from ${email}`);
      const user = await this.usersService.findUserFromEmail(email);
      if (!user) {
        throw `Can't get user from email`;
      }
      console.log(`user found ${user.email}`);
      return this.apiService.httpResponse(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.UNAUTHORIZED);
    }
  }

  // request : LoginRequest
  // result : LoginResult
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async doLogin(@Request() req): Promise<LoginResult> {
    try {
      const user: User = req.user;
      console.log(`login requested from ${user.email}`);
      const token = this.authService.getToken(user);
      return token;
    } catch (err) {
      console.log(`got error`);
      throw new HttpException(err, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('signup')
  async signup(@Body() request: SignUpRequest): Promise<LoginResult> {
    console.log(`signup requested`, request);
    const { email, name, password } = request;
    try {
      const _password = this.authService.hashPassword(password);
      return await this.authService.doSignup({
        email,
        name,
        _password,
      });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
