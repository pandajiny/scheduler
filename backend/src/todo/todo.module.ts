import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DbModule } from 'src/db/db.module';
import { GroupModule } from 'src/group/group.module';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  providers: [TodoService],
  controllers: [TodoController],
  imports: [AuthModule, GroupModule, DbModule],
})
export class TodoModule {}
