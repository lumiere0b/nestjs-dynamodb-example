import { Module } from '@nestjs/common';

import { providers } from './dynamo-db.providers';

@Module({
  providers: [
    ...providers
  ],
  exports: [
    ...providers
  ]
})
export class DynamoDbModule {}
