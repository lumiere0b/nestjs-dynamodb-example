import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations';

@table('User')
export class UserObject {

  @hashKey()
  username: string;

  @attribute()
  secret: string;

  @attribute()
  nickname: string;

  @attribute({ memberType: { type: 'String' } })
  roles: string[];

}
