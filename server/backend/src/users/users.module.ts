import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UsersService],
  imports: [DbModule],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
