import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { JwtFromRequestFunction, Strategy } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import { JwtPayloadAdmin, JwtPayloadWithRefreshTokenAdmin } from '../types';

const adminCookieExtractor: JwtFromRequestFunction = (req: Request) => {
  if (req && req.cookies) {
    console.log('--- Incoming Request Headers ---');
    console.log(req.headers);
    console.log('--- Incoming Cookies ---');
    console.log(req.cookies);

    return req.cookies['refreshToken'];
  }
  return null;
};

@Injectable()
export class RefreshTokenAdminStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt-admin', // must match the guard
) {
  constructor() {
    super({
      jwtFromRequest: adminCookieExtractor,
      secretOrKey: 'dummy', // secret is handled manually
      passReqToCallback: true,
    });
    console.log('✅ RefreshTokenAdminStrategy initialized');
  }

  validate(
    req: Request,
    payload: JwtPayloadAdmin,
  ): JwtPayloadWithRefreshTokenAdmin {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new ForbiddenException('Refresh token is missing (admin)');
    }

    // Decode to determine the role/permission level
    const decoded = jwt.decode(refreshToken) as any;
    const is_owner = decoded?.is_owner;

    // Select correct secret
    const secret = is_owner
      ? process.env.SUPERADMIN_REFRESH_TOKEN_KEY
      : process.env.ADMIN_REFRESH_TOKEN_KEY;

    if (!secret) {
      throw new ForbiddenException(
        `JWT secret not configured for admin (is_owner: ${is_owner})`,
      );
    }

    try {
      const verified = jwt.verify(refreshToken, secret) as JwtPayloadAdmin;
      return { ...verified, refreshToken };
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new ForbiddenException('Invalid or expired refresh token');
    }
  }
}
