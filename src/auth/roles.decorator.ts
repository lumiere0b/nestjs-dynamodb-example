import { SetMetadata } from '@nestjs/common';
import { Request } from 'express';

export const Roles = (...args: Array<string | ((request: Request) => string)>) => SetMetadata('roles', args);
