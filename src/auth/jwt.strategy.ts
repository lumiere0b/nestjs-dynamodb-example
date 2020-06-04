import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly users: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.publicKey,
      ignoreExpiration: false,
      audience: jwtConstants.audience,
      issuer: jwtConstants.issuer,
      algorithms: ['RS512']
    });
  }

  async validate(payload: any) {
    const username = payload.sub;
    try {
      const user = await this.users.get(username);
      if (!user) {
        throw new Error();
      }
      return { username, nickname: user.nickname, roles: user.roles };
    } catch (_) {
      throw new UnauthorizedException();
    }
  }
}
