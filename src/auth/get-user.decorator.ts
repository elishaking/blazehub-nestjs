import { createParamDecorator } from '@nestjs/common';
import { UserDto } from './dto';

export const GetUser = createParamDecorator(
  (data, req): UserDto => {
    return new UserDto(req.user);
  },
);
