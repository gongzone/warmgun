import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { RequestUser } from '../types/request-user';

export const GetUser = createParamDecorator(
  (data: keyof RequestUser, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();

    if (!req.user) {
      return null;
    }

    return data ? req.user[data] : req.user;
  },
);
