import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';

import environment from 'src/environment';

export const providers = [
  {
    provide: 'DYNAMO_DB_MAPPER',
    useFactory: () =>
      new DataMapper({
        client: new DynamoDB({
          region: 'REGION',
          endpoint: 'ENDPOINT'
        }),
        tableNamePrefix: environment.DYNAMO_DB_TABLE_NAME_PREFIX
      })
  }
];
