import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
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
