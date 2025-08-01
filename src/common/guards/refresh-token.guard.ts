import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const refreshToken = request.cookies?.refreshToken;

    if (!refreshToken) {
      throw new ForbiddenException('Refresh token not found');
    }

    try {
      // Decode token without verification to get the role
      const decoded = jwt.decode(refreshToken) as any;
      const role = decoded?.role;

      // Use the same role-based secret logic as in auth service
      const jwtConfigByRole = {
        user: process.env.OWNER_REFRESH_TOKEN_KEY,
        instructor: process.env.CLIENT_REFRESH_TOKEN_KEY,
        manager: process.env.WORKER_REFRESH_TOKEN_KEY,
      };

      const secret = jwtConfigByRole[role];
      if (!secret) {
        throw new ForbiddenException(`JWT config not found for role: ${role}`);
      }

      // Verify the token with the correct secret
      const verified = jwt.verify(refreshToken, secret) as JwtPayload;

      // Attach the user info to the request
      request.user = verified;
      request.user['refreshToken'] = refreshToken;

      return true;
    } catch (error) {
      console.error('Refresh token validation error:', error);
      throw new ForbiddenException('Invalid refresh token1');
    }
  }
}
