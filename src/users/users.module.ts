import { Module } from '@nestjs/common';

import { DynamoDbModule } from 'src/dynamo-db/dynamo-db.module';
import { providers } from './user.providers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    DynamoDbModule
  ],
  providers: [
    UsersService,
    ...providers
  ],
  exports: [
    UsersService
  ],
  controllers: [
    UsersController
  ]
})
export class UsersModule {}
