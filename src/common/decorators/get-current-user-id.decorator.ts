import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtPayload } from '../types';
import { winstonLogger } from '../loggger/logger';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    if (!user) {
      throw new ForbiddenException("Token noto'g'ri.");
    }
    winstonLogger.info('user', user);
    return user.id;
  },
);

//faqat guard dan keyin ishlatish zarur (refreshTokenGuard)
