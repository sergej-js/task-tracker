import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { Roles } from '../roles/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) { }

	matchRoles(roles: UserRole[], userRole: UserRole) {
		return roles.some((role) => role === userRole);
	}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get<UserRole[]>(Roles, context.getHandler());
		if (!roles) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		return this.matchRoles(roles, user.role);
	}
}