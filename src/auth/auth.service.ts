import { compareSync } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserObject } from 'src/users/user.object';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly users: UsersService
  ) { }

  async signin(user: UserObject) {
    const payload = { sub: user.username, nickname: user.nickname, roles: user.roles };
    return this.jwt.sign(payload);
  }

  async validateUser(username: string, password: string) {
    try {
      const user = await this.users.get(username);
      if (user && compareSync(password, user.secret)) {
        const { secret, ...result } = user;
        return result;
      }
    } catch (_) {
      return null;
    }
    return null;
  }
}
