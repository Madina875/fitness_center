import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminSelfGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const admin = req.admin;
    const targetId = req.params.id || req.body.id;

    if (!admin || !admin.id) {
      throw new ForbiddenException('Admin not authenticated');
    }
    if (!targetId) {
      throw new ForbiddenException('Target admin ID not found in request');
    }

    if (String(admin.id) !== String(targetId)) {
      throw new ForbiddenException('Access denied: not your own resource');
    }

    return true;
  }
}
