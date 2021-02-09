import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { DbService } from './db/db.service';

@Controller()
export class AppController {
  constructor(private readonly dbService: DbService) {}

  @Get()
  async checkServer(): Promise<string> {
    this.dbService.checkConnection().catch(err => {
      console.error(err);
      throw new InternalServerErrorException(`Cannot connect to db`);
    });
    return `server is running`;
  }
}
