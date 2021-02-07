import { Global, HttpModule, Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TodoModule } from 'src/todo/todo.module';
import { ApiModule } from 'src/api/api.module';

@Global()
@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [DbModule],
})
export class UsersModule {}
