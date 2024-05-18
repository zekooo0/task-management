import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { User } from './user.schema';

export const GetUser = createParamDecorator(
  (_data, cxt: ExecutionContext): User => {
    const req = cxt.switchToHttp().getResponse();
    // console.log(req);
    return req.req.user;
  },
);
