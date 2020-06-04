import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { hashSync } from 'bcryptjs';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {

  constructor(private readonly service: UsersService) { }

  @Get(':username')
  @Roles('admin')
  async getItem(@Param('username') username: string) {
    const { secret, ...data } = await this.service.get(username);
    return { data };
  }

  @Put(':username')
  @Roles('admin')
  async putItem(@Param('username') username: string, @Body() body: any) {
    let user = await this.service.get(username);
    const updated: {
      nickname: string;
      roles: string[];
      secret?: string;
    } = {
      nickname: body.nickname,
      roles: body.roles
    };
    if (body.password) {
      updated.secret = hashSync(body.password);
    }
    user = Object.assign(user, updated);

    const { secret, ...data } = await this.service.update(user);
    return { data };
  }

  @Delete(':username')
  @Roles('admin')
  async deleteItem(@Param('username') username: string) {
    if (username === 'admin') {
      throw new BadRequestException();
    }

    const user = await this.service.get(username);
    const deleted = !!(await this.service.delete(user.username));

    return { data: { deleted } };
  }

  @Get('')
  @Roles('admin')
  async getList() {
    const result = await this.service.scan();
    const data = result.map(({ secret, ...data }) => data);
    return { data };
  }

  @Post('')
  @Roles('admin')
  async post(@Body() body: any) {
    const { username } = body;
    let user;
    try {
      user = await this.service.get(username);
      if (user) {
        throw new BadRequestException();
      }
    } catch (e) {
      if (e.name !== 'ItemNotFoundException') {
        throw e;
      }
    }

    const { secret, ...data } = await this.service.update(
      this.service.getObject({
        username,
        nickname: body.nickname,
        roles: body.roles,
        secret: hashSync(body.password)
      })
    );
    return { data };
  }


}
