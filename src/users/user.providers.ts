import { UserObject } from './user.object';

export const providers = [
  {
    provide: 'USER_OBJECT',
    useValue: UserObject
  }
];
