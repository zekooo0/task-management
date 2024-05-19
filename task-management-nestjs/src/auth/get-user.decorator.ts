import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { User } from './user.schema';

export const GetUser = createParamDecorator(
  (_data, cxt: ExecutionContext): User => {
    const req = cxt.switchToHttp().getResponse();
    return req.req.user;
  },
);
