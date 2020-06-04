import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<(string | ((request: Request) => string))[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const availableRoles = roles.map((role) => typeof role === 'function' ? role(request) : role);
    availableRoles.push('admin');

    const user = request.user;
    if (!user || !user.roles) {
      return false;
    }
    const { roles: userRoles = [] } = user;

    return availableRoles.some((role) => userRoles.includes(role));
  }
}
