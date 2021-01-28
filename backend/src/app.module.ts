import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';
import { ApiModule } from './api/api.module';
import { UsersModule } from './users/users.module';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [UsersModule, DbModule, AuthModule, ApiModule],
})
export class AppModule {}
