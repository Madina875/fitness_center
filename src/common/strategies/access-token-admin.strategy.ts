import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, JwtPayloadAdmin } from '../types';

@Injectable()
export class AccessTokenAdminStrategy extends PassportStrategy(
  Strategy,
  'access-jwt-admin',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ADMIN_ACCESS_TOKEN_KEY!,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayloadAdmin): JwtPayloadAdmin {
    console.log('ADMIN JWT payload', payload);
    return payload;
  }
}
