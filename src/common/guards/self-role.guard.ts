import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  mixin,
} from '@nestjs/common';

export function SelfOrRoleGuard(allowedRoles: string[] | 'all') {
  @Injectable()
  class MixinSelfOrRoleGuard implements CanActivate {
    static ALL_ROLES = ['manager', 'instructor', 'user'];

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      const user = req.user;
      if (!user) {
        throw new ForbiddenException('User not found in request');
      }
      const targetId = req.params.id || req.body.id;
      const userId = String(user.id);

      const userRoles = Array.isArray(user.role) ? user.role : [user.role];

      const allowed =
        allowedRoles === 'all' ? MixinSelfOrRoleGuard.ALL_ROLES : allowedRoles;

      const isAllowedByRole = userRoles.some((role: any) =>
        allowed.includes(role),
      );

      const isSelf = userId === String(targetId);

      if (!isSelf && !isAllowedByRole) {
        throw new ForbiddenException('Access denied: not allowed');
      }

      return true;
    }
  }

  return mixin(MixinSelfOrRoleGuard);
}
