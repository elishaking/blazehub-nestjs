import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  readonly confirmed: boolean;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly username: string;

  constructor(user: any) {
    this.confirmed = user.confirmed || false;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
  }
}
