import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import {
  JwtPayload,
  JwtPayloadAdmin,
  JwtPayloadWithRefreshToken,
  JwtPayloadWithRefreshTokenAdmin,
} from '../types';

export const GetCurrentAdmin = createParamDecorator(
  (data: keyof JwtPayloadWithRefreshTokenAdmin, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    const admin = request.user as JwtPayloadAdmin;
    console.log(admin);
    console.log(request.user);
    console.log(data);

    if (!admin) {
      throw new ForbiddenException("Token noto'g'ri.");
    }
    if (!data) {
      return;
    }
    return admin[data];
  },
);
