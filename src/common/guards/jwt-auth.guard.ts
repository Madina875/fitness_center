import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Auth Header not found!!!');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid Bearer token');
    }

    const secrets = [
      process.env.WORKER_ACCESS_TOKEN_KEY,
      process.env.OWNER_ACCESS_TOKEN_KEY,
      process.env.ACCESS_TOKEN_KEY,
      process.env.SUPERADMIN_ACCESS_TOKEN_KEY,
      process.env.ADMIN_ACCESS_TOKEN_KEY,
    ];

    let decoded: any = null;
    for (const secret of secrets) {
      try {
        decoded = this.jwtService.verify(token, { secret });
        break;
      } catch (e) {}
    }

    if (!decoded) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // req.admin = decoded;

    if (decoded.role) {
      req.user = decoded;
    } else {
      req.admin = decoded;
    }

    return true;
  }
}
