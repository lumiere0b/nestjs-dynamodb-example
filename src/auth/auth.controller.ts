import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) { }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() request) {
    return { data: request.user };
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() request) {
    const data = { token: await this.auth.signin(request.user) };
    return { data };
  }
}
