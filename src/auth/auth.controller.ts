import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { Request, Response } from 'express';
import { GetCurrentUserId, GetCurrrentUser } from '../common/decorators';
import { RefreshTokenGuard } from '../common/guards';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignInUserDto } from '../user/dto/sign-in-user.dto';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SignInAdminDto } from '../admin/dto/sign-in-admin.dto';
import { RoleGuard } from '../common/guards/role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/jwt-auth.guard';

@ApiBearerAuth('access-token')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //-------------------------------------------USER ------------------------------------------------//

  @Post('user/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('user/signin')
  async sigin(
    @Body() singInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signin(singInUserDto, res);
  }

  @Get('user/activate/:link')
  async activate(@Param('link') activationLink: string) {
    return this.authService.activate(activationLink);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('user/signout')
  @HttpCode(HttpStatus.OK)
  async signout(
    @GetCurrentUserId() userId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signout(userId, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('user/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @GetCurrentUserId() userId: number,
    @GetCurrrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.updateRefreshToken(userId, refreshToken, res);
  }

  //------------------------------------------------------------------------------------------//

  //-----------------------------------------ADMIN-------------------------------------------------//

  @UseGuards(AuthGuard, RoleGuard(['superadmin']))
  @Post('admin/signup')
  async signupAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signupAdmin(createAdminDto);
  }

  @Post('admin/signin')
  async siginAdmin(
    @Body() singInAdminDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signinAdmin(singInAdminDto, res);
  }

  @Get('admin/activate/:link')
  async activateAdmin(@Param('link') activationLink: string) {
    return this.authService.activateAdmin(activationLink);
  }

  @Post('admin/signout/:id')
  async signoutAdmin(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signoutAdmin(+id, res);
  }

  @Post('admin/refresh')
  @HttpCode(HttpStatus.OK)
  refreshAdmin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.updateRefreshTokenAdmin(req, res);
  }

  //------------------------------------------------------------------------------------------//
}
