import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Put,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // get user information from jwt token
  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@Request() req): Promise<User> {
    try {
      const email = req.user.email;
      console.log(`user information requested from ${email}`);
      const user = await this.usersService.findUser(email);
      if (!user) {
        throw `Can't get user from email ${email}`;
      }
      console.log(`user found ${user.email}`);
      return user;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Put('user')
  async updateUser(@Request() req): Promise<void> {
    try {
      const user = req.user as User;
      if (!user) {
        throw `user not found`;
      }
      await this.usersService.updateUser(user);
    } catch (err) {
      throw new UnauthorizedException(err);
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
      throw new UnauthorizedException(err);
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
      throw new BadRequestException(err);
    }
  }
}
