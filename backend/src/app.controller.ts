import { AppService } from './app.service';
import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { DbService } from './db/db.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dbService: DbService,
  ) {}

  @Get()
  async isServerActivated(): Promise<string> {
    const connection = this.dbService.dbInstance.createConnection(
      this.dbService.getConnectOptions('scheduler_db'),
    );
    console.log(`server running check`);

    const result = await new Promise<string>(res => {
      connection.connect(err => {
        if (err) {
          console.log(`db connection invalid`, err);
          res(`db connection fail ${err}`);
        } else {
          res('Server Activated');
        }
      });

      connection.end();
    });

    console.log(`server running correctly`);
    return result;
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
