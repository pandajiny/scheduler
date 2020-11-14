import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';
import { DbModule } from './db/db.module';

@Module({
  providers: [AppService, TodoService],
  controllers: [AppController],
  imports: [AuthModule, TodoModule, DbModule],
})
export class AppModule {}
