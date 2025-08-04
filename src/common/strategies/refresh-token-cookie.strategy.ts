import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { JwtPayload, JwtPayloadWithRefreshToken } from '../types';
import * as jwt from 'jsonwebtoken';
import { winstonLogger } from '../loggger/logger';

export const cookieExtractor: JwtFromRequestFunction = (req: Request) => {
  winstonLogger.info(req.cookies);
  if (req && req.cookies) {
    return req.cookies['refreshToken'];
  }
  return null;
};

@Injectable()
export class RefreshTokenStrategyCookie extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.OWNER_REFRESH_TOKEN_KEY!, // Use a default secret for initial extraction
      passReqToCallback: true,
      ignoreExpiration: true, // We'll handle expiration manually
    });
  }

  async validate(
    req: Request,
    payload: JwtPayload,
  ): Promise<JwtPayloadWithRefreshToken> {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new ForbiddenException("Refreshtoken noto'g'ri");
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

      return { ...verified, refreshToken };
    } catch (error) {
      console.error('Refresh token validation error:', error);
      throw new ForbiddenException('Invalid refresh token2');
    }
  }
}
