import { Module } from '@nestjs/common';
import { ApiModule } from 'src/api/api.module';
import { DbModule } from 'src/db/db.module';
import { GroupModule } from 'src/group/group.module';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  providers: [TodoService],
  controllers: [TodoController],
  exports: [GroupModule],
  imports: [GroupModule, DbModule, ApiModule],
})
export class TodoModule {}
