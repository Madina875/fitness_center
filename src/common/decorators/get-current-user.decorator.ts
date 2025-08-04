import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtPayload, JwtPayloadWithRefreshToken } from '../types';
import { winstonLogger } from '../loggger/logger';

export const GetCurrrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRefreshToken, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;

    winstonLogger.info(user);
    winstonLogger.info(data);

    if (!user) {
      throw new ForbiddenException("Token noto'g'ri.");
    }
    if (!data) {
      return user;
    }
    return user[data];
  },
);
