import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

interface PaginationDecoratorOutput {
  page: number;
  skip: number;
  take: number;
}

export const Pagination = createParamDecorator<number, Request, PaginationDecoratorOutput>(
  (defaultTake: number, request: Request) => {
    let { pageSize = defaultTake, page = 1 } = request.query || {};
    page = Math.max(1, Math.ceil(+page));
    pageSize = Math.max(1, Math.ceil(+pageSize));

    return { page, skip: (page - 1) * pageSize, take: pageSize };
  }
);
