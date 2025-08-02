import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  mixin,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export function RoleGuard(allowedRoles: string[] | 'all') {
  @Injectable()
  class MixinRoleGuard implements CanActivate {
    static ALL_ROLES = [
      'admin',
      'superadmin',
      'customer',
      'manager',
      'instructor',
      'delivery',
      'user',
    ];

    constructor(public readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new ForbiddenException('No authorization header');
      }

      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new ForbiddenException('Invalid token format');
      }

      let decoded: any = null;
      let matchedSecret: string | undefined;

      const secretsToTry = [
        process.env.ADMIN_ACCESS_TOKEN_KEY,
        process.env.ACCESS_TOKEN_KEY,
        process.env.SUPERADMIN_ACCESS_TOKEN_KEY,
        process.env.OWNER_ACCESS_TOKEN_KEY,
        process.env.CLIENT_ACCESS_TOKEN_KEY,
        process.env.WORKER_ACCESS_TOKEN_KEY,
      ];

      for (const secret of secretsToTry) {
        try {
          decoded = this.jwtService.verify(token, { secret });
          matchedSecret = secret;
          break;
        } catch (_) {}
      }

      if (!decoded) {
        throw new ForbiddenException('Invalid or expired token');
      }

      // ✅ Attach decoded to request
      if (matchedSecret === process.env.ADMIN_ACCESS_TOKEN_KEY) {
        req.admin = decoded;
      } else {
        req.user = decoded;
      }

      // ✅ Custom logic for admin (based on is_owner)
      if (req.admin) {
        const isOwner = req.admin.is_owner === true;

        // Handle "superadmin" manually since admin has no roles
        if (
          allowedRoles === 'all' ||
          allowedRoles.includes('admin') ||
          (allowedRoles.includes('superadmin') && isOwner)
        ) {
          return true;
        }

        throw new ForbiddenException('Access denied: admin lacks permission');
      }

      // ✅ Handle user with roles
      const userRoles = Array.isArray(decoded.role)
        ? decoded.role
        : [decoded.role];

      const rolesToCheck =
        allowedRoles === 'all' ? MixinRoleGuard.ALL_ROLES : allowedRoles;

      const hasAccess = userRoles.some((role: string) =>
        rolesToCheck.includes(role),
      );

      if (!hasAccess) {
        throw new ForbiddenException('Access denied: insufficient role');
      }

      return true;
    }
  }

  return mixin(MixinRoleGuard);
}
