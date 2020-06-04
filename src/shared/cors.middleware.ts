import { NestMiddleware } from '@nestjs/common';
import * as cors from 'cors';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NextFunction, Request, Response } from 'express';

export const CorsMiddleware = (options?: CorsOptions) => {
  return class implements NestMiddleware {
    use(request: Request, response: Response, next: NextFunction) {
      cors(options)(request, response, next);
    }
  }
};
