import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: 'Auth Header not found!!!' });
    }
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'Bearer token not found!!!' });
    }
    const possibleSecrets = [
      process.env.ADMIN_ACCESS_TOKEN_KEY,
      process.env.WORKER_ACCESS_TOKEN_KEY,
      process.env.OWNER_ACCESS_TOKEN_KEY,
      process.env.ACCESS_TOKEN_KEY,
      process.env.SUPERADMIN_ACCESS_TOKEN_KEY,
      process.env.USER_ACCESS_TOKEN_KEY,
    ];

    let decodedPayload: any = null;
    for (const secret of possibleSecrets) {
      try {
        decodedPayload = this.jwtService.verify(token, { secret });
        break;
      } catch (error) {}
    }

    if (!decodedPayload) {
      throw new UnauthorizedException({
        message: 'User could not pass the authorization',
      });
    }

    req.user = decodedPayload;
    return true;
  }
}
