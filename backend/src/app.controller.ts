import { AppService } from './app.service';
import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  isServerActivated(): string {
    return 'Server Activated';
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // async getProfile(@Request() request) {
  //   console.log(`get profile`);
  //   console.log(request.user);
  //   return {
  //     login: ' ok',
  //   };
  // }
}
