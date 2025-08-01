import { JwtPayloadAdmin } from './jwt-payload-admin.type';

export type JwtPayloadWithRefreshTokenAdmin = JwtPayloadAdmin & {
  refreshToken: string;
};
