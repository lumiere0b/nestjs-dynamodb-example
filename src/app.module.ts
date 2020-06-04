import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { DynamoDbModule } from './dynamo-db/dynamo-db.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    DynamoDbModule,
    UsersModule
  ]
})
export class AppModule { }
