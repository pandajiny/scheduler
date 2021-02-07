import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { ApiModule } from 'src/api/api.module';

@Module({
  providers: [AuthService],
  imports: [UsersModule, ApiModule],
  controllers: [AuthController],
})
export class AuthModule {}
