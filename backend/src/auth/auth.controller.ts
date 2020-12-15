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
import { resourceLimits } from 'worker_threads';
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
    const email = req.user.email;
    console.log(`user information requested from ${email}`);
    const user = await this.usersService.findUserFromEmail(email).catch(err => {
      throw new HttpException(err, HttpStatus.UNAUTHORIZED);
    });
    console.log(`user found ${user.email}`);

    return this.apiService.httpResponse(user);
  }

  // request : LoginRequest
  // result : LoginResult
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async doLogin(@Request() req): Promise<HttpResponse<LoginResult>> {
    const user: User = req.user;
    console.log(`login requested from ${user.email}`);
    const result = await this.authService.doLogin(user);
    return this.apiService.httpResponse<LoginResult>(result);
  }

  @Post('signup')
  async signup(
    @Body() request: SignUpRequest,
  ): Promise<HttpResponse<LoginResult>> {
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

    return this.apiService.httpResponse(result);
  }
}
