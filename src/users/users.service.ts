import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Inject, Injectable } from '@nestjs/common';

import { UserObject } from './user.object';

@Injectable()
export class UsersService {

  constructor(
    @Inject('DYNAMO_DB_MAPPER') private readonly mapper: DataMapper,
    @Inject('USER_OBJECT') private readonly object: typeof UserObject
  ) { }

  async delete(username: string) {
    return this.mapper.delete(this.getObject({ username }));
  }

  async get(username: string) {
    return this.mapper.get(this.getObject({ username }));
  }

  getObject(props: any): UserObject {
    return Object.assign(new this.object, { ...props });
  }

  async scan() {
   const paginator = this.mapper.scan(this.object).pages();
   for await (let page of paginator) {
     return page;
   }
  }

  async update(object: UserObject) {
    return this.mapper.update(object);
  }

}
