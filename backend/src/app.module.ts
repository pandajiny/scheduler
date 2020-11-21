import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';
import { DbModule } from './db/db.module';
import { GroupService } from './group/group.service';
import { GroupController } from './group/group.controller';
import { GroupModule } from './group/group.module';

@Module({
  providers: [AppService, TodoService, GroupService],
  controllers: [AppController, GroupController],
  imports: [AuthModule, TodoModule, DbModule, GroupModule],
})
export class AppModule {}
