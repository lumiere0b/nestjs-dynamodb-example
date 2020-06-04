import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    if (exception.name === 'ItemNotFoundException') {
      super.catch(new NotFoundException(), host);
    } else {
      super.catch(exception, host);
    }
  }
}
