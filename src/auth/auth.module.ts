import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from 'src/users/users.module'

@Module({
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy
  ],
  imports: [
    JwtModule.register({
      publicKey: jwtConstants.publicKey,
      privateKey: jwtConstants.privateKey,
      signOptions: {
        expiresIn: '24h',
        issuer: jwtConstants.issuer,
        audience: jwtConstants.audience,
        algorithm: 'RS512'
      }
    }),
    PassportModule,
    UsersModule
  ],
  controllers: [
    AuthController
  ]
})
export class AuthModule {}
