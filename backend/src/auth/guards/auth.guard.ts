import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

// interface Request {
//   session: Session;
// }
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('UsersService') private readonly usersService: UsersService,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    return this.validateRequest(request);
  }

  validateRequest(request: Request): boolean {
    const uid = request.session.uid as string;
    if (!uid) {
      throw new UnauthorizedException(`User not logged in`);
    }
    return true;
  }
}
