import { createParamDecorator } from '@nestjs/common';
import { UserDto } from './dto';

export const GetUser = createParamDecorator(
  (data, req): UserDto => {
    return req.user || req.args[0].user;
  },
);
